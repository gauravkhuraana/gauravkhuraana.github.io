import React, {type ComponentProps, type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import OriginalDocItemContent from '@theme-original/DocItem/Content';
import SubscriptionForm from '@site/src/components/SubscriptionForm';

type Props = ComponentProps<typeof OriginalDocItemContent>;

export default function DocItemContent(props: Props): ReactNode {
  const {frontMatter} = useDoc();
  const hideSubscription = Boolean(
    (frontMatter as {hide_subscription?: boolean}).hide_subscription,
  );

  return (
    <>
      <OriginalDocItemContent {...props} />
      {!hideSubscription && (
        <aside aria-label="Newsletter signup">
          <SubscriptionForm
            title="Get Practical Testing Insights"
            description="Receive new testing, automation, AI, and DevOps guides in your inbox."
          />
        </aside>
      )}
    </>
  );
}