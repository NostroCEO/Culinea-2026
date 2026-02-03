import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useTheme } from "@/utils/theme";
import { router } from "expo-router";
import { Leaf } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function OnboardingGenerating() {
  const { colors } = useTheme();
  const [status, setStatus] = useState("Creating your perfect meal plan...");

  const scale = useSharedValue(1);

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    // Gentle pulse animation (no rotation for calmer feel)
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );

    // Status updates with calm messaging
    const steps = [
      { t: 1500, s: "Analyzing your preferences..." },
      { t: 3000, s: "Selecting perfect recipes..." },
      { t: 4500, s: "Building your grocery list..." },
      { t: 6000, s: "Almost done..." },
    ];

    steps.forEach((step) => {
      setTimeout(() => setStatus(step.s), step.t);
    });

    // Navigate to plan after generation
    setTimeout(() => {
      router.replace("/(tabs)/plan");
    }, 7500);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <Animated.View style={[animatedStyle, { marginBottom: 48 }]}>
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              backgroundColor: colors.surfaceSecondary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Leaf size={70} color={colors.primary} strokeWidth={1.5} />
          </View>
        </Animated.View>

        <Text
          style={{
            fontFamily: "InstrumentSans_600SemiBold",
            fontSize: 28,
            color: colors.text,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Creating your perfect meal plan...
        </Text>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 17,
            color: colors.textSecondary,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {status}
        </Text>

        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 15,
            color: colors.textTertiary,
            textAlign: "center",
          }}
        >
          This takes about 10 seconds
        </Text>
      </View>
    </SafeAreaView>
  );
}
