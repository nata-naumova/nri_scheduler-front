import { useEffect } from 'react';

export function Meta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');

      if (meta) {
        meta.setAttribute('content', description);
      } else {
        const metaTag = document.createElement('meta');
        metaTag.name = 'description';
        metaTag.content = description;
        document.head.appendChild(metaTag);
      }
    }
  }, [title, description]);
}
