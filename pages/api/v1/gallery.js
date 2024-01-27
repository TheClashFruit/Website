export default function handler(req, res) {
  res.status(200).json({
    data: [
      {
        alt: 'A black & white cat.',
        preview: 'https://cdn-new.theclashfruit.me/gallery/IMG_1799.jpg',
        image: {
          cr3: {
            name: 'IMG_1799.CR3',
            url: 'https://cdn-new.theclashfruit.me/gallery/cr3/IMG_1799.CR3'
          },
          jpg: {
            name: 'IMG_1799.jpg',
            url: 'https://cdn-new.theclashfruit.me/gallery/IMG_1799.jpg'
          }
        }
      },
      {
        alt: 'Dandelions in the sunset.',
        preview: 'https://cdn-new.theclashfruit.me/gallery/IMG_1707.jpg',
        image: {
          jpg: {
            name: 'IMG_1707.jpg',
            url: 'https://cdn-new.theclashfruit.me/gallery/IMG_1707.jpg'
          }
        }
      },
      {
        alt: 'Budapest from the MOL building.',
        preview: 'https://cdn-new.theclashfruit.me/gallery/20231109_122641.jpg',
        image: {
          jpg: {
            name: '20231109_122641.jpg',
            url: 'https://cdn-new.theclashfruit.me/gallery/20231109_122641.jpg'
          }
        }
      }
    ],
    total: 3
  });
}