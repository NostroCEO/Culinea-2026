import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/utils/theme";
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { CheckCircle2, Circle } from "lucide-react-native";

/**
 * Reusable OptionCard component for onboarding screens
 * Supports both single-select and multi-select modes
 */
export default function OptionCard({
  icon,
  label,
  subtitle,
  isSelected = false,
  onPress,
  multiSelect = false,
}) {
  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isSelected ? colors.surfaceSecondary : colors.surface,
        borderWidth: 2,
        borderColor: isSelected ? colors.primary : colors.border,
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 64,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {icon && (
          <Text style={{ fontSize: 24, marginRight: 16 }}>{icon}</Text>
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.text,
            }}
          >
            {label}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 15,
                color: colors.textSecondary,
                marginTop: 2,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Checkbox or Radio indicator */}
      {multiSelect ? (
        isSelected ? (
          <CheckCircle2 color={colors.primary} size={24} />
        ) : (
          <Circle color={colors.textTertiary} size={24} />
        )
      ) : (
        isSelected && (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.background,
              }}
            />
          </View>
        )
      )}
    </TouchableOpacity>
  );
}
