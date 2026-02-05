import { useEffect } from 'react';

type MetaProps = {
  title: string;
  description?: string;
};

export function usePageMeta({ title, description }: MetaProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let metaTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;

      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'description';
        document.head.appendChild(metaTag);
      }

      metaTag.content = description;
    }
  }, [title, description]);
}
