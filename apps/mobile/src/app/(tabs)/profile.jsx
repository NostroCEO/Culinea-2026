import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Linking,
} from "react-native";
import { useTheme } from "@/utils/theme";
import { useOnboardingStore } from "@/store/onboarding";
import { usePlanStore } from "@/store/plan";
import {
  User2,
  Clock,
  UtensilsCrossed,
  Ban,
  CreditCard,
  Mail,
  Shield,
  Star,
  ChevronRight,
  RefreshCw,
} from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const onboarding = useOnboardingStore();
  const plan = usePlanStore();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const SettingRow = ({ icon: Icon, label, value, onPress, showChevron = true }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 4,
      }}
    >
      <Icon color={colors.textSecondary} size={20} style={{ marginRight: 16 }} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: colors.text,
          }}
        >
          {label}
        </Text>
        {value && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.textSecondary,
              marginTop: 2,
            }}
          >
            {value}
          </Text>
        )}
      </View>
      {showChevron && <ChevronRight color={colors.textTertiary} size={20} />}
    </TouchableOpacity>
  );

  const getDietLabel = (diet) => {
    const labels = {
      none: "No restrictions",
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      pescatarian: "Pescatarian",
    };
    return labels[diet] || diet;
  };

  const getCookingTimeLabel = (time) => {
    const labels = {
      quick: "15-20 minutes",
      standard: "30-45 minutes",
      gourmet: "60+ minutes",
    };
    return labels[time] || time;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 40,
        }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "InstrumentSans_600SemiBold",
              fontSize: 32,
              color: colors.text,
            }}
          >
            Profile
          </Text>
        </View>

        {/* Pro Banner */}
        <TouchableOpacity
          onPress={() => router.push("/paywall")}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 24,
            marginHorizontal: 24,
            marginBottom: 32,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 20,
                color: colors.buttonPrimaryText,
                marginBottom: 4,
              }}
            >
              Upgrade to Pro
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.buttonPrimaryText,
                opacity: 0.9,
              }}
            >
              Unlimited plans, detailed recipes, and more
            </Text>
          </View>
          <Star color="#FFD700" size={32} fill="#FFD700" />
        </TouchableOpacity>

        {/* My Preferences Section */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 13,
              color: colors.textSecondary,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
              marginHorizontal: 24,
            }}
          >
            My Preferences
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ paddingHorizontal: 24 }}>
              <SettingRow
                icon={User2}
                label="Household Size"
                value={`${onboarding.householdSize} ${onboarding.householdSize === 1 ? "person" : "people"}`}
                onPress={() => router.push("/onboarding/household")}
              />
              <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 36 }} />
              <SettingRow
                icon={Clock}
                label="Cooking Time"
                value={getCookingTimeLabel(onboarding.cookingTime)}
                onPress={() => router.push("/onboarding/time")}
              />
              <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 36 }} />
              <SettingRow
                icon={UtensilsCrossed}
                label="Dietary Preferences"
                value={getDietLabel(onboarding.diet)}
                onPress={() => router.push("/onboarding/diet")}
              />
              <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 36 }} />
              <SettingRow
                icon={Ban}
                label="Excluded Ingredients"
                value={onboarding.exclusions.length > 0 ? `${onboarding.exclusions.length} items` : "None"}
                onPress={() => router.push("/onboarding/exclusions")}
              />
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 13,
              color: colors.textSecondary,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
              marginHorizontal: 24,
            }}
          >
            Account
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ paddingHorizontal: 24 }}>
              <SettingRow
                icon={CreditCard}
                label="Manage Subscription"
                value="Free Plan"
                onPress={() => router.push("/paywall")}
              />
              <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 36 }} />
              <SettingRow
                icon={Mail}
                label="Contact Support"
                onPress={() => Linking.openURL("mailto:support@culinea.app")}
              />
              <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 36 }} />
              <SettingRow
                icon={Shield}
                label="Privacy Policy"
                onPress={() => Linking.openURL("https://culinea.app/privacy")}
              />
            </View>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          onPress={() => {
            onboarding.reset();
            plan.reset();
            router.replace("/onboarding");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            padding: 16,
            marginHorizontal: 24,
          }}
        >
          <RefreshCw color={colors.error} size={20} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.error,
              marginLeft: 8,
            }}
          >
            Reset App Data
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 13,
            color: colors.textTertiary,
            textAlign: "center",
            marginTop: 32,
          }}
        >
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
