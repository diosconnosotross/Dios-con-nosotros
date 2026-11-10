const { isIP } = require('node:net');

const allowedPaths = new Set([
  '/',
  '/windows',
  '/fivem',
  '/apps',
  '/comunidad',
]);

function isAllowedPath(path) {
  return typeof path === 'string'
    && (allowedPaths.has(path) || /^\/recurso\/\d+$/.test(path));
}

function stringValue(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : 'No disponible';
}

async function lookupLocation(ip) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const result = await fetch(
      `https://json.geoiplookup.io/${encodeURIComponent(ip)}`,
      { signal: controller.signal },
    );
    if (!result.ok) {
      throw new Error(`GeoIP provider returned HTTP ${result.status}.`);
    }

    const data = await result.json();
    if (!data || data.success === false) {
      throw new Error('GeoIP provider did not return a successful lookup.');
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const origin = request.headers.origin;
  const requestHost = request.headers['x-forwarded-host'] || request.headers.host;
  try {
    if (!origin || new URL(origin).host.toLowerCase() !== requestHost.toLowerCase()) {
      return response.status(403).json({ error: 'Origin not allowed' });
    }
  } catch {
    return response.status(403).json({ error: 'Origin not allowed' });
  }

  const path = request.body && request.body.path;
  if (!isAllowedPath(path)) {
    return response.status(400).json({ error: 'Invalid page path' });
  }
  if (request.body.consent !== true) {
    return response.status(400).json({ error: 'Explicit consent is required' });
  }

  const forwardedFor = request.headers['x-forwarded-for'];
  const clientIp = typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : '';
  if (!clientIp || !isIP(clientIp)) {
    return response.status(503).json({ error: 'Visitor IP is unavailable' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return response.status(503).json({ error: 'Visit logging is not configured' });
  }

  let parsedWebhookUrl;
  try {
    parsedWebhookUrl = new URL(webhookUrl);
  } catch {
    return response.status(500).json({ error: 'Webhook configuration is invalid' });
  }

  if (
    parsedWebhookUrl.protocol !== 'https:'
    || !['discord.com', 'discordapp.com'].includes(parsedWebhookUrl.hostname)
    || !parsedWebhookUrl.pathname.startsWith('/api/webhooks/')
  ) {
    return response.status(500).json({ error: 'Webhook configuration is invalid' });
  }

  let location;
  try {
    location = await lookupLocation(clientIp);
  } catch (error) {
    console.error('Visitor geolocation lookup failed.', error);
    return response.status(502).json({ error: 'Visitor geolocation lookup failed' });
  }

  const connectionType = stringValue(location.connection_type);
  const vpnSignal = connectionType === 'Corporate'
    ? 'Red corporativa indicada; no confirma VPN'
    : `No se detectó red corporativa (${connectionType}); no descarta VPN`;
  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);
  const coordinates = Number.isFinite(latitude) && Number.isFinite(longitude)
    ? `[${latitude}, ${longitude}](https://www.google.com/maps/search/?api=1&query=${latitude},${longitude})`
    : 'No disponible';
  const userAgent = request.headers['user-agent'] || 'No disponible';

  const payload = {
    embeds: [{
      title: 'Visita consentida al sitio',
      color: 39423,
      fields: [
        { name: 'IP', value: clientIp, inline: true },
        { name: 'Señal VPN/proxy', value: vpnSignal, inline: true },
        { name: 'Navegador (User-Agent)', value: String(userAgent).slice(0, 1000), inline: false },
        {
          name: 'País / código',
          value: `${stringValue(location.country_name)} / ${stringValue(location.country_code)}`,
          inline: true,
        },
        {
          name: 'Región / ciudad / código postal',
          value: [
            stringValue(location.region),
            stringValue(location.city),
            stringValue(location.postal_code),
          ].join(' / ').slice(0, 1000),
          inline: true,
        },
        { name: 'Coordenadas aproximadas', value: coordinates, inline: true },
        { name: 'Tipo de conexión', value: connectionType, inline: true },
        { name: 'Página', value: path, inline: true },
        { name: 'Fecha y hora (UTC)', value: new Date().toISOString(), inline: true },
      ],
    }],
    allowed_mentions: { parse: [] },
  };

  let discordResponse;
  try {
    discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Discord visitor webhook request failed.', error);
    return response.status(502).json({ error: 'Could not deliver the visit log' });
  }

  if (!discordResponse.ok) {
    console.error(`Discord visitor webhook returned HTTP ${discordResponse.status}.`);
    return response.status(502).json({ error: 'Could not deliver the visit log' });
  }

  return response.status(204).end();
};
