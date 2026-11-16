import React from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LanguageScreen from '../screens/LanguageScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReportsScreen from '../screens/ReportsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AboutScreen from '../screens/AboutScreen';

import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, ...restProps }) {
  const { i18n, locale } = useLanguage();
  const { user, logout } = useAuth();

  const handleSafeNavigate = (routeName, replace = false) => {
    try {
      if (replace) {
        logout();
        navigation.replace(routeName);
      } else {
        navigation.navigate(routeName);
      }
    } catch (error) {
      Alert.alert(i18n('errorTitle'), i18n('navigationError'));
    }
  };

  return (
    <DrawerContentScrollView
      navigation={navigation}
      contentContainerStyle={styles.drawerScroll}
      {...restProps}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.brandRow}>
          <View style={styles.brandLogo}>
            <Text style={styles.brandLogoText}>UVV</Text>
          </View>
          <View style={styles.brandInfo}>
            <Text style={styles.brandTitle}>Workspace</Text>
            <Text style={styles.brandSubtitle} numberOfLines={1}>
              {user?.email || 'aluno@uvv.br'}
            </Text>
          </View>
          <View style={styles.localePill}>
            <Text style={styles.localePillText}>{locale.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.drawerSection}>
        <DrawerItemList navigation={navigation} {...restProps} />
      </View>

      <View style={styles.separator} />

      <View style={styles.drawerFooter}>
        <DrawerItem
          label={i18n('languageTitle')}
          labelStyle={styles.footerItemLabel}
          style={styles.footerItem}
          onPress={() => handleSafeNavigate('LanguageConfig')}
        />
        <DrawerItem
          label={i18n('logout')}
          labelStyle={styles.logoutLabel}
          style={styles.logoutItem}
          onPress={() => handleSafeNavigate('Login', true)}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  const { i18n } = useLanguage();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e4e4e7',
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
          color: '#09090b',
        },
        headerTintColor: '#09090b',
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 280,
          borderRightWidth: 1,
          borderRightColor: '#e4e4e7',
        },
        drawerActiveTintColor: '#09090b',
        drawerActiveBackgroundColor: '#f4f4f5',
        drawerInactiveTintColor: '#71717a',
        drawerItemStyle: {
          borderRadius: 8,
          marginHorizontal: 8,
          marginVertical: 2,
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen name="HomeTab" component={HomeScreen} options={{ title: i18n('homeTitle') }} />
      <Drawer.Screen name="DashboardTab" component={DashboardScreen} options={{ title: i18n('dashboardTitle') }} />
      <Drawer.Screen name="CategoriesTab" component={CategoriesScreen} options={{ title: i18n('categoriesTitle') }} />
      <Drawer.Screen name="ProfileTab" component={ProfileScreen} options={{ title: i18n('profileTitle') }} />
      <Drawer.Screen name="ReportsTab" component={ReportsScreen} options={{ title: i18n('reportsTitle') }} />
      <Drawer.Screen name="NotificationsTab" component={NotificationsScreen} options={{ title: i18n('notificationsTitle') }} />
      <Drawer.Screen name="AboutTab" component={AboutScreen} options={{ title: i18n('aboutTitle') }} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { i18n } = useLanguage();

  const handleUnhandledAction = (action) => {
    Alert.alert(
      i18n('errorTitle'),
      `${i18n('navigationError')} (${action?.type || 'UNKNOWN'})`
    );
  };

  return (
    <NavigationContainer onUnhandledAction={handleUnhandledAction}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e4e4e7',
          },
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '600',
            color: '#09090b',
          },
          headerTintColor: '#09090b',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="LanguageConfig" component={LanguageScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ headerShown: true, title: i18n('taskDetail') }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route?.params?.task ? i18n('editTask') : i18n('addTask'),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerScroll: {
    paddingTop: 12,
  },
  drawerHeader: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandLogoText: {
    color: '#fafafa',
    fontSize: 12,
    fontWeight: '700',
  },
  brandInfo: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#09090b',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 1,
  },
  localePill: {
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  localePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3f3f46',
  },
  drawerSection: {
    paddingVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e4e4e7',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  drawerFooter: {
    paddingBottom: 16,
  },
  footerItem: {
    borderRadius: 8,
    marginHorizontal: 8,
  },
  footerItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3f3f46',
  },
  logoutItem: {
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#fef2f2',
  },
  logoutLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
});
