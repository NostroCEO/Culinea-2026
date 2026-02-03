import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useTheme } from "@/utils/theme";
import { router } from "expo-router";
import { Leaf } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  FadeIn,
} from "react-native-reanimated";

export default function OnboardingWelcome() {
  const { colors } = useTheme();
  const [showContent, setShowContent] = useState(false);

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  });

  // Gentle pulse animation for brand identity
  const scale = useSharedValue(1);

  useEffect(() => {
    // Show splash briefly, then content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!fontsLoaded) return null;

  // Splash Screen (Screen 1)
  if (!showContent) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View style={animatedStyle}>
            <Leaf size={120} color={colors.primary} strokeWidth={1.5} />
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  // Welcome Screen (Screen 2)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Animated.View
        entering={FadeIn.duration(600)}
        style={{ flex: 1 }}
      >
        {/* Hero Section - 40% of screen */}
        <View
          style={{
            height: "40%",
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <Text style={{ fontSize: 80 }}>🥗</Text>
        </View>

        {/* Content Section */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 32,
            paddingTop: 48,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 32,
                color: colors.text,
                textAlign: "center",
                lineHeight: 40,
                marginBottom: 20,
              }}
            >
              Your personalized meal plan — ready in 2 minutes
            </Text>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 17,
                color: colors.textSecondary,
                textAlign: "center",
                lineHeight: 24,
                paddingHorizontal: 10,
              }}
            >
              Answer a few questions and we'll create a simple, realistic weekly
              meal plan just for you.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/onboarding/household")}
            style={{
              backgroundColor: colors.buttonPrimary,
              paddingVertical: 18,
              borderRadius: 30,
              alignItems: "center",
              marginBottom: 40,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: colors.buttonPrimaryText,
                fontSize: 18,
                fontFamily: "Inter_500Medium",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
