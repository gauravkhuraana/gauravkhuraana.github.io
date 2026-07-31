import React, {type ComponentProps, type ReactNode} from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import OriginalBlogPostItemContent from '@theme-original/BlogPostItem/Content';
import SubscriptionForm from '@site/src/components/SubscriptionForm';

type Props = ComponentProps<typeof OriginalBlogPostItemContent>;

export default function BlogPostItemContent(props: Props): ReactNode {
  const {frontMatter, isBlogPostPage} = useBlogPost();
  const hideSubscription = Boolean(
    (frontMatter as {hide_subscription?: boolean}).hide_subscription,
  );

  return (
    <>
      <OriginalBlogPostItemContent {...props} />
      {isBlogPostPage && !hideSubscription && (
        <aside aria-label="Newsletter signup">
          <SubscriptionForm
            title="Stay Current with Testing and Automation"
            description="Get new practical guides and professional insights delivered to your inbox."
          />
        </aside>
      )}
    </>
  );
}