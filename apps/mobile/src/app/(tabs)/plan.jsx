import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/utils/theme";
import { usePlanStore } from "@/store/plan";
import { useOnboardingStore } from "@/store/onboarding";
import { Sparkles, Utensils } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useQuery } from "@tanstack/react-query";
import MealCard from "@/components/MealCard";
import RegenerateModal from "@/components/RegenerateModal";
import { format, addDays } from "date-fns";

// Mock meal plan generator for demo purposes
const generateMockPlan = (preferences) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const baseDate = new Date();
  
  const meals = days.map((day, index) => ({
    date: format(addDays(baseDate, index), "MMM d"),
    dayName: day,
    meals: [
      {
        type: "breakfast",
        name: "Veggie Scramble",
        cookTime: 15,
      },
      {
        type: "lunch",
        name: "Quinoa & Chickpea Bowl",
        cookTime: 20,
      },
      {
        type: "dinner",
        name: "Lemon Herb Chicken",
        cookTime: 35,
      },
    ],
  }));

  const groceries = [
    { id: "1", name: "Spinach", amount: "2 bunches", category: "Produce", completed: false },
    { id: "2", name: "Tomatoes", amount: "6", category: "Produce", completed: false },
    { id: "3", name: "Chicken breast", amount: "1 lb", category: "Meat & Protein", completed: false },
    { id: "4", name: "Greek yogurt", amount: "16 oz", category: "Dairy", completed: false },
  ];

  return { meals, groceries };
};

export default function PlanScreen() {
  const { colors } = useTheme();
  const { currentPlan, setPlan } = usePlanStore();
  const onboarding = useOnboardingStore();
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const { refetch, isFetching } = useQuery({
    queryKey: ["generatePlan"],
    queryFn: async () => {
      // TODO: Replace with actual API call when backend is ready
      // For now, generate mock data
      const mockData = generateMockPlan(onboarding);
      setPlan(mockData.meals, mockData.groceries);
      return mockData;
    },
    enabled: false,
  });

  useEffect(() => {
    if (!currentPlan) {
      refetch();
    }
  }, []);

  const handleRegenerate = () => {
    setShowRegenerateModal(false);
    refetch();
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 10,
            paddingBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 32,
                color: colors.text,
              }}
            >
              Your Week
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowRegenerateModal(true)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.surfaceSecondary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sparkles color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        {/* Plan Content */}
        {currentPlan && currentPlan.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {currentPlan.map((day, index) => (
              <View key={index} style={{ marginBottom: 32 }}>
                {/* Day Header */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 17,
                      color: colors.text,
                    }}
                  >
                    📅 {day.dayName}, {day.date}
                  </Text>
                </View>

                {/* Meals for the day */}
                {day.meals.map((meal, mealIndex) => (
                  <MealCard
                    key={mealIndex}
                    meal={meal}
                    onPress={() => {
                      // TODO: Navigate to meal details
                      console.log("Meal tapped:", meal);
                    }}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 40,
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: colors.surfaceSecondary,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Utensils color={colors.textTertiary} size={48} />
            </View>
            <Text
              style={{
                fontFamily: "InstrumentSans_600SemiBold",
                fontSize: 24,
                color: colors.text,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              No plan yet
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: colors.textSecondary,
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              Complete onboarding to generate your personalized meal plan.
            </Text>
          </View>
        )}
      </View>

      {/* Regenerate Modal */}
      <RegenerateModal
        visible={showRegenerateModal}
        onClose={() => setShowRegenerateModal(false)}
        onRegenerate={handleRegenerate}
      />
    </SafeAreaView>
  );
}
