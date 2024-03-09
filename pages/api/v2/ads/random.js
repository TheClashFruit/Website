export default async function handler(req, res) {
  res.status(200).json({
    id: 1,
    advertiser: 'TheClashFruit',
    title: 'Place your ad here!',
    content: 'Contact me at [admin@theclashfruit.me](mailto:admin@theclashfruit.me).',
    html: '<h3>Place your ad here!</h3><p style="margin-bottom: 0;">Contact me at <a href="mailto:admin@theclashfruit.me">admin@theclashfruit.me</a>.</p>',
    url: null,
    weight: 1
  });
}