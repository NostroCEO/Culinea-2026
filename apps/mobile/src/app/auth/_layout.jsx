import { Stack } from "expo-router";
import { useTheme } from "@/utils/theme";

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.primary },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
