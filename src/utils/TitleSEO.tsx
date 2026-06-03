import { Helmet } from 'react-helmet-async';

type TitleSEOProps = {
    title: string;
    description?: string;
    canonical?: string;
    metaNoIndex?: boolean;
};

export function TitleSEO({ title, description, canonical, metaNoIndex }: TitleSEOProps) {
    return (
        <Helmet>
            <title>{title}</title>

            {description && <meta name="description" content={description} />}

            {canonical && <link rel="canonical" href={canonical} />}

            {metaNoIndex && <meta name="robots" content="noindex, nofollow" />}
        </Helmet>
    );
}
