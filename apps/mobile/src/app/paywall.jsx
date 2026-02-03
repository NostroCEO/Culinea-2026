import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/utils/theme";
import { ChevronLeft } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Animated, { FadeInDown, SlideInUp } from "react-native-reanimated";

export default function PaywallScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      {/* Hero Image Section */}
      <View style={{ height: "40%", position: "relative" }}>
        {/* Back Button */}
        <SafeAreaView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              marginLeft: 20,
              marginTop: 12,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.3)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChevronLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Hero Image Placeholder */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primaryLight,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 80 }}>🎉</Text>
        </View>
      </View>

      {/* Content Section */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          marginTop: -32,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Animated.View entering={SlideInUp.duration(400).delay(100)}>
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 28,
                color: colors.text,
                textAlign: "center",
                marginBottom: 12,
                lineHeight: 36,
              }}
            >
              Your personal plan{"\n"}is ready
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 15,
                color: colors.textSecondary,
                textAlign: "center",
                marginBottom: 32,
                lineHeight: 22,
                paddingHorizontal: 16,
              }}
            >
              Upgrade your account and get full access to jumpstart your practice.
            </Text>
          </Animated.View>

          {/* Pricing Cards */}
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            {/* Monthly Plan */}
            <TouchableOpacity
              onPress={() => setSelectedPlan("monthly")}
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                borderWidth: 2,
                borderColor:
                  selectedPlan === "monthly" ? colors.primary : colors.border,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor:
                      selectedPlan === "monthly"
                        ? colors.primary
                        : colors.border,
                    backgroundColor:
                      selectedPlan === "monthly"
                        ? colors.primary
                        : "transparent",
                    marginRight: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {selectedPlan === "monthly" && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: colors.text,
                  }}
                >
                  1 Month Plan
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginBottom: 4,
                  marginLeft: 32,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  for only{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 24,
                    color: colors.text,
                  }}
                >
                  $12
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  {" "}
                  / month
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginLeft: 32,
                }}
              >
                Billed monthly. Cancel anytime.
              </Text>
            </TouchableOpacity>

            {/* Yearly Plan */}
            <TouchableOpacity
              onPress={() => setSelectedPlan("yearly")}
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 20,
                marginBottom: 24,
                borderWidth: 2,
                borderColor:
                  selectedPlan === "yearly" ? colors.primary : colors.border,
                position: "relative",
              }}
            >
              {/* BEST VALUE Badge */}
              {selectedPlan === "yearly" && (
                <View
                  style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: [{ translateX: -40 }],
                    backgroundColor: "#FFD60A",
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 10,
                      color: "#1D1D1F",
                      letterSpacing: 0.5,
                    }}
                  >
                    BEST VALUE
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor:
                      selectedPlan === "yearly"
                        ? colors.primary
                        : colors.border,
                    backgroundColor:
                      selectedPlan === "yearly"
                        ? colors.primary
                        : "transparent",
                    marginRight: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {selectedPlan === "yearly" && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: colors.text,
                  }}
                >
                  1 Year Plan
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginBottom: 4,
                  marginLeft: 32,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  for only{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 24,
                    color: colors.text,
                  }}
                >
                  $8
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: colors.textSecondary,
                  }}
                >
                  {" "}
                  / month
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginLeft: 32,
                }}
              >
                Billed yearly. Cancel anytime.
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Upgrade Button */}
          <Animated.View entering={FadeInDown.duration(500).delay(400)}>
            <TouchableOpacity
              onPress={() => {
                // TODO: Implement subscription logic
                router.back();
              }}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: "center",
                marginBottom: 16,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                  color: "#FFFFFF",
                  letterSpacing: 0.5,
                }}
              >
                Upgrade
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: colors.textTertiary,
                textAlign: "center",
                lineHeight: 18,
              }}
            >
              By continuing you agree to the Terms & Conditions
            </Text>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}
