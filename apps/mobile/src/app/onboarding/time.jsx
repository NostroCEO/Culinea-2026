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
import {
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import ProgressBar from "@/components/ProgressBar";
import OptionCard from "@/components/OptionCard";

const OPTIONS = [
  {
    id: "quick",
    label: "15-20 minutes",
    subtitle: "Quick & simple",
    icon: "⚡",
  },
  {
    id: "standard",
    label: "30-45 minutes",
    subtitle: "Balanced cooking",
    icon: "⏱️",
  },
  {
    id: "gourmet",
    label: "60+ minutes",
    subtitle: "I enjoy cooking",
    icon: "👨‍🍳",
  },
];

export default function OnboardingTime() {
  const { colors } = useTheme();
  const { cookingTime, setCookingTime } = useOnboardingStore();

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

        <ProgressBar currentStep={2} totalSteps={4} />

        <Text
          style={{
            fontFamily: "InstrumentSans_600SemiBold",
            fontSize: 28,
            color: colors.text,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          How much time do you have for cooking each day?
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
          We'll match recipes to your schedule.
        </Text>

        <View style={{ marginBottom: 20 }}>
          {OPTIONS.map((item) => (
            <OptionCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              subtitle={item.subtitle}
              isSelected={cookingTime === item.id}
              onPress={() => setCookingTime(item.id)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => router.push("/onboarding/diet")}
          style={{
            backgroundColor: colors.buttonPrimary,
            paddingVertical: 18,
            borderRadius: 30,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: colors.buttonPrimaryText,
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
