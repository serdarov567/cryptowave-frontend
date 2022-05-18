import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "src/components/Navbar";
import PlanItem from "src/components/PlanItem";
import { useIsSignedIn } from "src/utils/user";
import { useNavigate } from "react-router-dom";
import useUserDashboard from "src/pages/Dashboard/useUserDashboard";
import useLanguage from "src/languages/useLanguage";
import LoadingIndicator from "src/components/LoadingIndicator";

const PlanHistory = () => {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [loading]);

  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  const { plans, earnings, networkLoading } = useUserDashboard();

  const [plansHistory, setPlansHistory] = useState([]);

  const renderUserPlans = useMemo(() => {
    setPlansHistory(
      plans.filter(
        (plan) => plan.status === "Canceled" || plan.status === "Completed"
      )
    );

    return plans
      .filter(
        (plan) => plan.status === "Canceled" || plan.status === "Completed"
      )
      .map((plan, index) => {
        return (
          <PlanItem
            langKeys={langKeys}
            uniqueKey={plan._id}
            title={plan.title}
            number={plan.number}
            dateOfPurchase={plan.dateOfPurchase}
            dateOfExpiration={plan.dateOfExpiration}
            deposit={plan.deposit}
            percentage={plan.percentage}
            reward={plan.reward}
            walletType={plan.wallet.type}
            status={plan.status}
          />
        );
      });
  }, [plans, earnings]);

  return (
    <Box>
      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      />
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <Flex flexDir={"column"}>
          <VStack w={"full"} paddingBottom={"100px"} spacing={5}>
            <Heading marginBlock={"20px"}>{langKeys["planHistory"]}</Heading>
            {networkLoading ? (
              <LoadingIndicator title={langKeys["loading"]} />
            ) : plansHistory.length > 0 ? (
              renderUserPlans
            ) : (
              <Text>{langKeys["noPlans"]}</Text>
            )}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default PlanHistory;
