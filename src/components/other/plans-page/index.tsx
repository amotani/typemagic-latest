import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tier } from "./Tier";
import { User, UserPlanInfo } from "@/utils/types";
import {
  getStripeCheckoutLink,
  getStripeCustomerPortalLink,
  getUserPlanInfo,
} from "@/utils/functions";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signIn } from "@/utils/auth";
import { constants } from "@/styles/constants";
import { styled } from "@stitches/react";
import { styles } from "@/styles";
import { ArrowRight } from "@/icons";
import { MinimalButton } from "../../base/MinimalButton";
import { isDevelopmentEnvironment } from "@/utils";
import { Navbar } from "../landing-page/Navbar";
import { Header, Title } from "../../base/Text";

const PlansPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPlanInfo, setUserPlanInfo] = useState<UserPlanInfo | null>(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  let [width, setWidth] = useState(1000);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const isMobile = width < 800;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          id: user.uid,
          name: user.displayName as string,
          picture: user.photoURL as string,
          email: user.email as string,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserPlanInfo = async () => {
        const planInfo = await getUserPlanInfo(user.id);
        setUserPlanInfo(planInfo as UserPlanInfo);
      };
      fetchUserPlanInfo();
    } else {
      setUserPlanInfo(null);
    }
  }, [user]);

  const tiers = constants.tiers as { [key: number]: { [key: string]: any } };

  const getTier = (
    tier: number,
    isActive?: boolean,
    showSubscribeButton?: boolean
  ) => {
    let priceId = isDevelopmentEnvironment()
      ? tiers[tier].testId
      : tiers[tier].id;

    return (
      <Tier
        name={tiers[tier].name}
        price={tiers[tier].price}
        description={tiers[tier].description}
        benefits={tiers[tier].benefits}
        priceId={priceId}
        isActiveTier={isActive}
        showSubscribeButton={showSubscribeButton}
        stripeCustomerId={userPlanInfo?.stripeCustomerId}
      />
    );
  };

  const renderTiers = () => {
    if (!userPlanInfo) {
      return (
        <>
          {getTier(0)}
          {getTier(1)}
          {getTier(2)}
        </>
      );
    }

    if (userPlanInfo.currentPlan === 0) {
      return (
        <>
          {getTier(0, true, true)}
          {getTier(1, false, true)}
          {getTier(2, false, true)}
        </>
      );
    }

    if (userPlanInfo.currentPlan === 1) {
      return (
        <>
          {getTier(1, true)}
          {getTier(2, false, true)}
        </>
      );
    }

    if (userPlanInfo.currentPlan === 2) {
      return <>{getTier(2, true, false)}</>;
    }
  };

  return (
    <Container>
      <Navbar isPlans isSignedIn={user !== undefined} />
      <Header>Typemagic plans</Header>

      <TiersSection isMobile={isMobile}>{renderTiers()}</TiersSection>
      {!user && (
        <MinimalButton
          hugContent
          label="Sign in to manage your plan."
          onClick={() => signIn("plans")}
        />
      )}
      {user && userPlanInfo && userPlanInfo.stripeCustomerId && (
        <MinimalButton
          label="Manage plan"
          hugContent
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            let url = await getStripeCustomerPortalLink();
            window.open(url);
            setIsLoading(false);
          }}
        />
      )}
      <CommentsSection>
        {constants.plansComments.map((comment) => (
          <CommentContainer>
            <Comment>{comment}</Comment>
          </CommentContainer>
        ))}
      </CommentsSection>
    </Container>
  );
};

const Container = styled("div", {
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 64,
  textAlign: "center",
  padding: 16,
  paddingTop: 120,
  paddingBottom: 64,
  background: styles.landingPageBg,
});

const TiersSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: 24,

  variants: {
    isMobile: {
      true: {
        flexDirection: "column",
      },
    },
  },
});

const CommentsSection = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
});

const CommentContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 12,
});

const Comment = styled("span", {
  fontSize: 13,
  color: styles.fontColor.caption,
  textAlign: "left",
  lineHeight: 1.5,
});

export default PlansPage;
