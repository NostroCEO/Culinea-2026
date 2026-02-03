import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
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

const COMMON_EXCLUSIONS = [
  { id: "nuts", label: "Nuts", icon: "🥜" },
  { id: "spicy", label: "Spicy foods", icon: "🌶️" },
  { id: "garlic", label: "Garlic", icon: "🧄" },
  { id: "dairy", label: "Dairy", icon: "🧀" },
  { id: "shellfish", label: "Shellfish", icon: "🦐" },
  { id: "mushrooms", label: "Mushrooms", icon: "🍄" },
];

export default function OnboardingExclusions() {
  const { colors } = useTheme();
  const { exclusions, setExclusions } = useOnboardingStore();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const toggleExclusion = (id) => {
    if (exclusions.includes(id)) {
      setExclusions(exclusions.filter((e) => e !== id));
    } else {
      setExclusions([...exclusions, id]);
    }
  };

  const handleSkip = () => {
    setExclusions([]);
    router.push("/onboarding/generating");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20 }}>
        {/* Header with Skip button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={colors.text} size={28} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 17,
                color: colors.primary,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <ProgressBar currentStep={4} totalSteps={4} />

        <Text
          style={{
            fontFamily: "InstrumentSans_600SemiBold",
            fontSize: 28,
            color: colors.text,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Anything you'd like to avoid?
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
          Select any ingredients you dislike or are allergic to (optional).
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {COMMON_EXCLUSIONS.map((item) => (
            <OptionCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              isSelected={exclusions.includes(item.id)}
              onPress={() => toggleExclusion(item.id)}
              multiSelect={true}
            />
          ))}
        </ScrollView>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          onPress={() => router.push("/onboarding/generating")}
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
            Generate My Plan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
