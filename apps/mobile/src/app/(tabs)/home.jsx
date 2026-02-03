import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/utils/theme";
import { Menu, X } from "lucide-react-native";
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
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [showMilestone, setShowMilestone] = useState(true);

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  // Mock meal data
  const todayMeals = [
    {
      id: 1,
      name: "Avocado Toast with Poached Eggs",
      image: "🥑",
      time: "15 min",
      calories: 420,
      type: "breakfast",
    },
    {
      id: 2,
      name: "Grilled Salmon with Quinoa",
      image: "🍣",
      time: "35 min",
      calories: 580,
      type: "lunch",
    },
    {
      id: 3,
      name: "Thai Green Curry",
      image: "🍛",
      time: "40 min",
      calories: 650,
      type: "dinner",
    },
  ];

  const upcomingMeals = [
    {
      id: 4,
      name: "Berry Smoothie Bowl",
      image: "🍓",
      day: "Tomorrow",
    },
    {
      id: 5,
      name: "Mediterranean Pasta",
      image: "🍝",
      day: "Tomorrow",
    },
    {
      id: 6,
      name: "Steak & Veggies",
      image: "🥩",
      day: "Wednesday",
    },
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  color: colors.textSecondary,
                }}
              >
                Good morning,
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 18,
                  color: colors.text,
                }}
              >
                Rebecca
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.surface,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Menu size={20} color={colors.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Milestone Achievement Card */}
        {showMilestone && (
          <Animated.View
            entering={SlideInRight.duration(500).delay(200)}
            style={{
              marginHorizontal: 24,
              marginTop: 16,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFF4E6",
                borderRadius: 16,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#FF9500",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#FFD60A",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 28 }}>🎉</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                    color: "#1D1D1F",
                    marginBottom: 4,
                  }}
                >
                  Wow! You made it
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: "#6E6E73",
                    lineHeight: 18,
                  }}
                >
                  You have won 5 days free trial of the daily diet plan. Enjoy!
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowMilestone(false)}
                style={{ padding: 4 }}
              >
                <X size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* Today's Meals Section */}
        <Animated.View
          entering={FadeInUp.duration(500).delay(300)}
          style={{ marginBottom: 32 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 24,
                color: colors.text,
              }}
            >
              Today's Meals
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
          >
            {todayMeals.map((meal, index) => (
              <Animated.View
                key={meal.id}
                entering={FadeInDown.duration(500).delay(400 + index * 100)}
              >
                <TouchableOpacity
                  style={{
                    width: width * 0.7,
                    backgroundColor: colors.card,
                    borderRadius: 20,
                    overflow: "hidden",
                    shadowColor: colors.text,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 3,
                  }}
                >
                  {/* Image Placeholder */}
                  <View
                    style={{
                      height: 180,
                      backgroundColor: colors.primary + "20",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 80 }}>{meal.image}</Text>
                  </View>

                  {/* Content */}
                  <View style={{ padding: 16 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.primary + "20",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 11,
                            color: colors.primary,
                            textTransform: "uppercase",
                          }}
                        >
                          {meal.type}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "Inter_500Medium",
                          fontSize: 12,
                          color: colors.textSecondary,
                        }}
                      >
                        ⏱️ {meal.time}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 17,
                        color: colors.text,
                        marginBottom: 8,
                      }}
                    >
                      {meal.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 15,
                          color: colors.text,
                        }}
                      >
                        {meal.calories}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 13,
                          color: colors.textSecondary,
                        }}
                      >
                        kcal
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Upcoming Meals Grid */}
        <Animated.View
          entering={FadeInUp.duration(500).delay(600)}
          style={{ paddingHorizontal: 24, marginBottom: 32 }}
        >
          <Text
            style={{
              fontFamily: "InstrumentSans_600SemiBold",
              fontSize: 24,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Coming Up
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {upcomingMeals.map((meal, index) => (
              <Animated.View
                key={meal.id}
                entering={FadeInUp.duration(400).delay(700 + index * 100)}
                style={{ width: (width - 60) / 2 }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 16,
                    padding: 16,
                    aspectRatio: 1,
                    justifyContent: "space-between",
                    shadowColor: colors.text,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View>
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: colors.primary + "15",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <Text style={{ fontSize: 32 }}>{meal.image}</Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 15,
                        color: colors.text,
                        marginBottom: 4,
                      }}
                    >
                      {meal.name}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: colors.textSecondary,
                    }}
                  >
                    {meal.day}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
