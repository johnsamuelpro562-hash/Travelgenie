import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width: screenWidth } = Dimensions.get('window');

// ========== EXACT DESIGN SPECIFICATIONS ==========
const DESIGN = {
  colors: {
    background: '#FFFFFF',
    headerBg: '#F8F8F8',
    headerBorder: '#DDDDDD', 
    headerText: '#222222',
    userBubble: '#E6F0FF',
    userBubbleText: '#000000',
    cardBg: '#FFFFFF',
    cardShadow: '#00000020',
    primaryText: '#222222',
    secondaryText: '#444444',
    mutedText: '#777777',
    placeholderText: '#888888',
    inputBg: '#F2F2F2',
    inputBorder: '#DDDDDD',
    accent: '#FFD700',
    accentShadow: '#FFD70080'
  }
};

export default function App() {
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    setInputText('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: DESIGN.colors.background }}>
      <StatusBar style="dark" />
      
      {/* Header - Exact match from design.json */}
      <View style={{
        height: 60,
        backgroundColor: DESIGN.colors.headerBg,
        borderBottomWidth: 1,
        borderBottomColor: DESIGN.colors.headerBorder,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
      }}>
        {/* Genie Lamp Icon */}
        <View style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 14,
          shadowColor: DESIGN.colors.accentShadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4
        }}>
          <Text style={{ fontSize: 24 }}>🧞</Text>
        </View>
        
        {/* App Title */}
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 24,
          color: DESIGN.colors.headerText,
          textTransform: 'lowercase'
        }}>
          travel genie
        </Text>
      </View>

      {/* Chat Content */}
      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Message Bubble */}
        <View style={{
          alignSelf: 'flex-end',
          backgroundColor: DESIGN.colors.userBubble,
          borderRadius: 18,
          paddingHorizontal: 16,
          paddingVertical: 12,
          maxWidth: screenWidth - 80,
          marginBottom: 16,
          shadowColor: '#00000010',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 20,
            color: DESIGN.colors.userBubbleText
          }}>
            Find me a flight to{"\n"}Nairobi next Friday.
          </Text>
        </View>

        {/* Flight Details Card */}
        <View style={{
          width: screenWidth - 40,
          backgroundColor: DESIGN.colors.cardBg,
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          shadowColor: DESIGN.colors.cardShadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.125,
          shadowRadius: 6,
          elevation: 4
        }}>
          {/* Route Row - LOS · NBO */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <Text style={{
              fontSize: 22,
              fontWeight: '700',
              lineHeight: 26,
              color: DESIGN.colors.primaryText
            }}>
              LOS
            </Text>
            
            {/* Plane and connecting line */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginHorizontal: 12 
            }}>
              <View style={{ 
                width: 40, 
                height: 1, 
                backgroundColor: DESIGN.colors.mutedText,
                marginHorizontal: 8 
              }} />
              <Text style={{ fontSize: 20, color: DESIGN.colors.mutedText }}>✈️</Text>
              <View style={{ 
                width: 40, 
                height: 1, 
                backgroundColor: DESIGN.colors.mutedText,
                marginHorizontal: 8 
              }} />
            </View>
            
            <Text style={{
              fontSize: 22,
              fontWeight: '700',
              lineHeight: 26,
              color: DESIGN.colors.primaryText
            }}>
              NBO
            </Text>
          </View>

          {/* Date */}
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 20,
            color: DESIGN.colors.secondaryText,
            marginBottom: 16
          }}>
            Date: Friday
          </Text>

          {/* Time Row */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <Text style={{ fontSize: 20, color: DESIGN.colors.mutedText, marginRight: 8 }}>🕒</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              lineHeight: 20,
              color: DESIGN.colors.primaryText
            }}>
              08:15 – 14:30
            </Text>
          </View>

          {/* Luggage Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: DESIGN.colors.mutedText, marginRight: 8 }}>🧳</Text>
            <Text style={{
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 18,
              color: DESIGN.colors.secondaryText
            }}>
              Includes luggage
            </Text>
          </View>
        </View>

        {/* Spacer for input area */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {/* Input Box */}
        <View style={{
          flex: 1,
          backgroundColor: DESIGN.colors.inputBg,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: DESIGN.colors.inputBorder,
          paddingHorizontal: 20,
          paddingVertical: 14,
          marginRight: 12
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: '400',
            fontStyle: 'italic',
            lineHeight: 18,
            color: DESIGN.colors.placeholderText
          }}>
            Tell your genie your travel wish...
          </Text>
        </View>

        {/* Microphone Button */}
        <TouchableOpacity style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: DESIGN.colors.inputBg,
          borderWidth: 1,
          borderColor: DESIGN.colors.inputBorder,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8
        }}>
          <Text style={{ fontSize: 20 }}>🎤</Text>
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity 
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: DESIGN.colors.accent,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={handleSend}
        >
          <Text style={{ fontSize: 20 }}>📤</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}