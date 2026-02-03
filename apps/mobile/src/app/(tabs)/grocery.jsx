import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/utils/theme";
import { usePlanStore } from "@/store/plan";
import { CheckCircle2, Circle, ShoppingBasket } from "lucide-react-native";
import {
  useFonts,
  InstrumentSans_600SemiBold,
} from "@expo-google-fonts/instrument-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { format } from "date-fns";

const getCategoryIcon = (category) => {
  const icons = {
    Produce: "🥬",
    "Meat & Protein": "🍖",
    Dairy: "🥛",
    Pantry: "🥫",
    Bakery: "🍞",
    Frozen: "🧊",
  };
  return icons[category] || "🛒";
};

export default function GroceryScreen() {
  const { colors } = useTheme();
  const { groceries, toggleGrocery } = usePlanStore();

  const [fontsLoaded] = useFonts({
    InstrumentSans_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const categories = useMemo(() => {
    return [...new Set(groceries.map((g) => g.category))];
  }, [groceries]);

  const completedCount = useMemo(() => {
    return groceries.filter((g) => g.completed).length;
  }, [groceries]);

  const currentDate = format(new Date(), "MMM d");
  const endDate = format(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), "MMM d");

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 }}
        >
          <Text
            style={{
              fontFamily: "InstrumentSans_600SemiBold",
              fontSize: 32,
              color: colors.text,
            }}
          >
            Grocery List
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.textSecondary,
            }}
          >
            {groceries.length > 0 
              ? `For ${currentDate} - ${endDate}`
              : "Everything you need for the week"
            }
          </Text>
        </View>

        {groceries.length > 0 ? (
          <>
            {/* Progress indicator */}
            {completedCount > 0 && (
              <View style={{ paddingHorizontal: 24, marginBottom: 20 }}>
                <View
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 15,
                      color: colors.text,
                      marginBottom: 8,
                    }}
                  >
                    {completedCount} of {groceries.length} completed
                  </Text>
                  <View
                    style={{
                      height: 6,
                      backgroundColor: colors.border,
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: `${(completedCount / groceries.length) * 100}%`,
                        backgroundColor: colors.success,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                </View>
              </View>
            )}

            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              {categories.map((category) => (
                <View key={category} style={{ marginBottom: 32 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text style={{ fontSize: 20, marginRight: 8 }}>
                      {getCategoryIcon(category)}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 14,
                        color: colors.primary,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      {category}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: colors.border,
                      overflow: "hidden",
                    }}
                  >
                    {groceries
                      .filter((g) => g.category === category)
                      .map((item, idx, arr) => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => toggleGrocery(item.id)}
                          activeOpacity={0.7}
                          style={{
                            padding: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomWidth: idx === arr.length - 1 ? 0 : 1,
                            borderBottomColor: colors.border,
                            minHeight: 68,
                          }}
                        >
                          {item.completed ? (
                            <CheckCircle2 color={colors.success} size={24} />
                          ) : (
                            <Circle color={colors.textTertiary} size={24} />
                          )}

                          <View style={{ flex: 1, marginLeft: 16 }}>
                            <Text
                              style={{
                                fontFamily: "Inter_500Medium",
                                fontSize: 16,
                                color: item.completed
                                  ? colors.textTertiary
                                  : colors.text,
                                textDecorationLine: item.completed
                                  ? "line-through"
                                  : "none",
                                marginBottom: 2,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Inter_400Regular",
                                fontSize: 14,
                                color: colors.textSecondary,
                              }}
                            >
                              {item.amount}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
              ))}

              {/* Completion message */}
              {completedCount === groceries.length && (
                <View
                  style={{
                    backgroundColor: colors.surfaceSecondary,
                    borderRadius: 16,
                    padding: 24,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 48, marginBottom: 12 }}>🎉</Text>
                  <Text
                    style={{
                      fontFamily: "InstrumentSans_600SemiBold",
                      fontSize: 20,
                      color: colors.text,
                      textAlign: "center",
                    }}
                  >
                    All done!
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
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
              <ShoppingBasket color={colors.textTertiary} size={48} />
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
              List is empty
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              Your grocery list will appear here once you generate a meal plan.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
