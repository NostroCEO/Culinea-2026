import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "@/utils/theme";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { BlurView } from "expo-blur";

/**
 * Modal for regenerating meal plan
 * Half-sheet presentation with option to regenerate or cancel
 */
export default function RegenerateModal({ visible, onClose, onRegenerate }) {
  const { colors, isDark } = useTheme();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={{
            backgroundColor: colors.surface,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 40,
            minHeight: 280,
          }}
        >
          {/* Drag handle */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: colors.border,
              borderRadius: 2,
              alignSelf: "center",
              marginBottom: 24,
            }}
          />

          <Text
            style={{
              fontFamily: "InstrumentSans_600SemiBold",
              fontSize: 24,
              color: colors.text,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Get a fresh plan?
          </Text>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 17,
              color: colors.textSecondary,
              textAlign: "center",
              marginBottom: 32,
              paddingHorizontal: 20,
            }}
          >
            We'll create a new meal plan based on your preferences.
          </Text>

          <TouchableOpacity
            onPress={onRegenerate}
            style={{
              backgroundColor: colors.buttonPrimary,
              paddingVertical: 18,
              borderRadius: 30,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: colors.buttonPrimaryText,
                fontSize: 18,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Generate New Plan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={{
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 17,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
