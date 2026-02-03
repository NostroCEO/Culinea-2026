import React from "react";
import { View } from "react-native";
import { useTheme } from "@/utils/theme";

/**
 * Progress indicator for onboarding screens
 * Shows current step progress
 */
export default function ProgressBar({ currentStep, totalSteps }) {
  const { colors } = useTheme();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View
      style={{
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        overflow: "hidden",
        marginBottom: 24,
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: colors.primary,
          borderRadius: 2,
        }}
      />
    </View>
  );
}
