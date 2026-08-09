import type { Schema, Struct } from '@strapi/strapi';

export interface AboutMilestone extends Struct.ComponentSchema {
  collectionName: 'components_about_milestones';
  info: {
    description: 'Company milestone/timeline entry';
    displayName: 'Milestone';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCapabilities extends Struct.ComponentSchema {
  collectionName: 'components_sections_capabilities';
  info: {
    description: 'Core capabilities/features section';
    displayName: 'Capabilities Section';
    icon: 'apps';
  };
  attributes: {
    heading: Schema.Attribute.Component<'shared.section-heading', false>;
    items: Schema.Attribute.Component<'sections.capability-item', true>;
  };
}

export interface SectionsCapabilityItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_capability_items';
  info: {
    description: 'A single capability/feature item';
    displayName: 'Capability Item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    description: 'Call to action section';
    displayName: 'CTA Section';
    icon: 'cursor';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Homepage hero/banner section';
    displayName: 'Hero Section';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsIntroduction extends Struct.ComponentSchema {
  collectionName: 'components_sections_introductions';
  info: {
    description: 'Company introduction section';
    displayName: 'Introduction Section';
    icon: 'information';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.Component<'shared.section-heading', false>;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsStatistics extends Struct.ComponentSchema {
  collectionName: 'components_sections_statistics';
  info: {
    description: 'Company statistics/numbers section';
    displayName: 'Statistics Section';
    icon: 'chartBubble';
  };
  attributes: {
    heading: Schema.Attribute.Component<'shared.section-heading', false>;
    items: Schema.Attribute.Component<'shared.statistic-item', true>;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: 'Contact information block';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    mapUrl: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    workingHours: Schema.Attribute.Text;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    description: 'Call to action button';
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Navigation or content link';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headings';
  info: {
    description: 'Reusable section heading with title and subtitle';
    displayName: 'Section Heading';
    icon: 'heading';
  };
  attributes: {
    centered: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    description: 'Reusable SEO metadata component';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    noFollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media link';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'zalo', 'linkedin', 'youtube', 'instagram', 'twitter', 'tiktok', 'wechat']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatisticItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_statistic_items';
  info: {
    description: 'A single statistic with number and label';
    displayName: 'Statistic Item';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about.milestone': AboutMilestone;
      'sections.capabilities': SectionsCapabilities;
      'sections.capability-item': SectionsCapabilityItem;
      'sections.cta-section': SectionsCtaSection;
      'sections.hero': SectionsHero;
      'sections.introduction': SectionsIntroduction;
      'sections.statistics': SectionsStatistics;
      'shared.contact-info': SharedContactInfo;
      'shared.cta': SharedCta;
      'shared.link': SharedLink;
      'shared.section-heading': SharedSectionHeading;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.statistic-item': SharedStatisticItem;
    }
  }
}
