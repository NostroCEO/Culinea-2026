import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/utils/theme";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Clock } from "lucide-react-native";

/**
 * Meal card component for displaying individual meals in the plan
 */
export default function MealCard({ meal, onPress }) {
  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const getMealIcon = (type) => {
    const icons = {
      breakfast: "🍳",
      lunch: "🥗",
      dinner: "🍽️",
    };
    return icons[type?.toLowerCase()] || "🍽️";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20, marginRight: 12 }}>
          {getMealIcon(meal.type)}
        </Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: colors.textSecondary,
              textTransform: "capitalize",
              marginBottom: 2,
            }}
          >
            {meal.type}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.text,
              marginBottom: 4,
            }}
          >
            {meal.name}
          </Text>
          {meal.cookTime && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Clock color={colors.textTertiary} size={14} />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.textSecondary,
                  marginLeft: 6,
                }}
              >
                {meal.cookTime} min
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
