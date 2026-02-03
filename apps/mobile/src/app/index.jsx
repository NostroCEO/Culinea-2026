import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { usePlanStore } from "@/store/plan";
import { useTheme } from "@/utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const { colors } = useTheme();
  const { currentPlan } = usePlanStore();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAppStatus();
  }, []);

  const checkAppStatus = async () => {
    try {
      // Check if user is authenticated (for now, check if they have a plan)
      // TODO: Replace with actual auth check when backend is ready
      const hasData = currentPlan && currentPlan.length > 0;
      setIsAuthenticated(hasData);
      setHasCompletedOnboarding(hasData);
    } catch (error) {
      console.error("Error checking app status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Navigation logic:
  // 1. If user has completed onboarding → Main app
  // 2. If user is not authenticated → Signup screen
  // 3. Otherwise → Onboarding
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)/plan" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/signup" />;
  }

  return <Redirect href="/onboarding" />;
}
