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

const DIETS = [
  { id: "none", label: "No restrictions", icon: "🍖" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
  { id: "vegan", label: "Vegan", icon: "🌱" },
  { id: "pescatarian", label: "Pescatarian", icon: "🐟" },
];

export default function OnboardingDiet() {
  const { colors } = useTheme();
  const { diet, setDiet } = useOnboardingStore();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  // Pre-select "No restrictions" if nothing is selected
  React.useEffect(() => {
    if (!diet) {
      setDiet("none");
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>

        <ProgressBar currentStep={3} totalSteps={4} />

        <Text
          style={{
            fontFamily: "InstrumentSans_600SemiBold",
            fontSize: 28,
            color: colors.text,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Any dietary preferences?
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
          We'll filter recipes to match your lifestyle.
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {DIETS.map((item) => (
            <OptionCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              isSelected={diet === item.id}
              onPress={() => setDiet(item.id)}
            />
          ))}
        </ScrollView>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          onPress={() => router.push("/onboarding/exclusions")}
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
