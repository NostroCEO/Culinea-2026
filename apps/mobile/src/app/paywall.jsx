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
import { X, Check } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

const BENEFITS = [
  "Unlimited plan regenerations",
  "Weekly grocery lists",
  "Personalized for your household",
  "Save favorite meals",
  "Detailed recipes with instructions",
];

export default function PaywallScreen() {
  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const handleSubscribe = () => {
    // TODO: Implement subscription logic with react-native-purchases
    console.log("Subscribe tapped");
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.surfaceSecondary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <X color={colors.text} size={24} />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingTop: 80,
            paddingBottom: 40,
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontFamily: "InstrumentSans_600SemiBold",
              fontSize: 32,
              color: colors.text,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Unlock Unlimited Plans
          </Text>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 17,
              color: colors.textSecondary,
              textAlign: "center",
              marginBottom: 48,
              paddingHorizontal: 20,
            }}
          >
            Get the most out of Culinea with unlimited meal planning
          </Text>

          {/* Benefits */}
          <View style={{ marginBottom: 48 }}>
            {BENEFITS.map((benefit, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Check color={colors.buttonPrimaryText} size={18} />
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 17,
                    color: colors.text,
                    flex: 1,
                  }}
                >
                  {benefit}
                </Text>
              </View>
            ))}
          </View>

          {/* Pricing */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 20,
              padding: 24,
              marginBottom: 32,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 24,
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                $4.99/month
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.textSecondary,
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                or $39.99/year (Save 33%)
              </Text>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            onPress={handleSubscribe}
            style={{
              backgroundColor: colors.buttonPrimary,
              paddingVertical: 18,
              borderRadius: 30,
              alignItems: "center",
              marginBottom: 16,
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
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Start Free Trial
            </Text>
          </TouchableOpacity>

          {/* Fine Print */}
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: colors.textTertiary,
              textAlign: "center",
            }}
          >
            Cancel anytime • Secure with Apple
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
