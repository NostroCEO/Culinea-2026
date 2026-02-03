import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useTheme } from "@/utils/theme";
import { router } from "expo-router";
import { useOnboardingStore } from "@/store/onboarding";
import { ChevronLeft } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import ProgressBar from "@/components/ProgressBar";
import OptionCard from "@/components/OptionCard";

const HOUSEHOLD_OPTIONS = [
  { id: 1, label: "Just me", icon: "👤" },
  { id: 2, label: "2 people", icon: "👥" },
  { id: 3, label: "3-4 people", icon: "👨‍👩‍👧", value: 3 },
  { id: 5, label: "5+ people", icon: "👨‍👩‍👧‍👦", value: 5 },
];

export default function OnboardingHousehold() {
  const { colors } = useTheme();
  const { householdSize, setHouseholdSize } = useOnboardingStore();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>

        <ProgressBar currentStep={1} totalSteps={4} />

        <Text
          style={{
            fontFamily: "InstrumentSans_600SemiBold",
            fontSize: 28,
            color: colors.text,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          How many people are you cooking for?
        </Text>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: 32,
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          We'll adjust portion sizes and grocery quantities.
        </Text>

        <View style={{ marginBottom: 20 }}>
          {HOUSEHOLD_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              icon={option.icon}
              label={option.label}
              isSelected={householdSize === (option.value || option.id)}
              onPress={() => setHouseholdSize(option.value || option.id)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => router.push("/onboarding/time")}
          disabled={!householdSize}
          style={{
            backgroundColor: householdSize
              ? colors.buttonPrimary
              : colors.buttonSecondary,
            paddingVertical: 18,
            borderRadius: 30,
            alignItems: "center",
            marginBottom: 20,
            opacity: householdSize ? 1 : 0.6,
          }}
        >
          <Text
            style={{
              color: householdSize
                ? colors.buttonPrimaryText
                : colors.buttonSecondaryText,
              fontSize: 18,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
