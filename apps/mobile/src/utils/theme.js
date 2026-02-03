import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();

  const colors = {
    light: {
      background: "#F8F9FA", // Soft cream
      surface: "#FFFFFF",
      surfaceSecondary: "#E9ECEF",
      primary: "#1B4332", // Deep green
      primaryLight: "#2D6A4F",
      accent: "#74C69D", // Light organic green
      text: "#1B4332", // Keep text dark green for brand coherence
      textSecondary: "#52796F",
      textTertiary: "#84A98C",
      border: "#DEE2E6",
      error: "#E63946",
      success: "#2D6A4F",

      // UI Specific
      buttonPrimary: "#1B4332",
      buttonPrimaryText: "#F8F9FA",
      buttonSecondary: "#E9ECEF",
      buttonSecondaryText: "#1B4332",

      cardBackground: "#FFFFFF",
      checkboxActive: "#1B4332",
      checkboxInactive: "#DEE2E6",
    },
    dark: {
      background: "#081C15", // Ultra deep green
      surface: "#1B4332",
      surfaceSecondary: "#2D6A4F",
      primary: "#74C69D", // Flip primary for dark mode readability
      primaryLight: "#95D5B2",
      accent: "#B7E4C7",
      text: "#F8F9FA",
      textSecondary: "#B7E4C7",
      textTertiary: "#74C69D",
      border: "#2D6A4F",
      error: "#FF4D6D",
      success: "#95D5B2",

      // UI Specific
      buttonPrimary: "#74C69D",
      buttonPrimaryText: "#081C15",
      buttonSecondary: "#2D6A4F",
      buttonSecondaryText: "#F8F9FA",

      cardBackground: "#1B4332",
      checkboxActive: "#74C69D",
      checkboxInactive: "#2D6A4F",
    },
  };

  return {
    colors: colors[colorScheme] || colors.light,
    isDark: colorScheme === "dark",
  };
};
