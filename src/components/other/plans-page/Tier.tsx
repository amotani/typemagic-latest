import { styles } from "@/styles";
import { styled } from "@stitches/react";
import { Body, Caption } from "../../base/Text";
import { MinimalButton } from "../../base/MinimalButton";
import { ArrowRight } from "@/icons";
import { useState } from "react";
import {
  getStripeCheckoutLink,
  getStripeCustomerPortalLink,
} from "@/utils/functions";

export const Tier = (props: {
  name: string;
  price: number;
  description: string;
  benefits: string[];
  priceId?: string;
  showSubscribeButton?: boolean;
  isActiveTier?: boolean;
  stripeCustomerId?: string;
}) => {
  let [isLoading, setIsLoading] = useState(false);

  const subscribe = async () => {
    if (!props.showSubscribeButton || !props.priceId) return;
    setIsLoading(true);

    let url;
    if (props.stripeCustomerId) {
      url = await getStripeCustomerPortalLink();
    } else {
      url = await getStripeCheckoutLink(props.priceId as string);
    }
    setIsLoading(false);
    window.open(url);
  };

  return (
    <Container isSpecial={props.name === "Pro"}>
      <TopPane>
        <InfoSection>
          <Name>{props.name}</Name>
          <Price>${props.price}</Price>
          <Description>{props.description}</Description>
        </InfoSection>
        <BenefitsSection>
          {props.benefits.map((benefit) => (
            <Benefit>
              <span style={{ flexShrink: 0 }}>
                <ArrowRight fill={styles.fontColor.caption} />
              </span>
              <Body>{benefit}</Body>
              {/* <Body>
                <Markdown content={benefit}></Markdown>
              </Body> */}
            </Benefit>
          ))}
        </BenefitsSection>
      </TopPane>
      <div style={{ width: "100%", textAlign: "center", marginBottom: 8 }}>
        {props.isActiveTier && <Caption>Current plan</Caption>}
      </div>
      {props.showSubscribeButton && !props.isActiveTier && (
        <MinimalButton
          label={`Upgrade to ${props.name}`}
          isLoading={isLoading}
          onClick={() => subscribe()}
          isBlack
        />
      )}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  maxWidth: 300,
  minWidth: 300,
  padding: 16,
  background: "transparent",
  variants: {
    isSpecial: {
      true: {
        background: styles.selectedBackground,
      },
    },
  },
  justifyContent: "space-between",
  borderRadius: 12,
  border: styles.border,
  textAlign: "left",
  minHeight: 420,
});

const Benefit = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
  justifyContent: "flex-start",
});

const TopPane = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 32,
});

const InfoSection = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const BenefitsSection = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const Name = styled("span", {
  fontSize: 18,
  fontWeight: 600,
  color: styles.fontColor.primary,
});

const Price = styled("span", {
  fontSize: 32,
  fontWeight: 800,
  color: styles.fontColor.primary,
});

const Description = styled("span", {
  fontSize: 14,
  fontWeight: 400,
  color: styles.fontColor.caption,
});
