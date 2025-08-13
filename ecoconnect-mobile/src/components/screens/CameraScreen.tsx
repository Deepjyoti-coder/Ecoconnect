import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card, Button, LoadingSpinner } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { AppStackParamList } from '@/navigation';

type CameraScreenNavigationProp = StackNavigationProp<AppStackParamList>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const CameraScreen: React.FC = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Mock camera functionality for now
  const handleCaptureImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate image capture and analysis
    setTimeout(() => {
      setAnalysisResult({
        wasteType: 'Plastic Bottle',
        confidence: 0.92,
        points: 15,
        disposalMethod: 'Recyclable - Place in blue bin',
        tips: [
          'Remove cap and label if possible',
          'Rinse to remove any residue',
          'Crush to save space'
        ]
      });
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleRetakePhoto = () => {
    setShowResults(false);
    setAnalysisResult(null);
  };

  const handleSaveResult = () => {
    Alert.alert(
      'Result Saved!',
      `You earned ${analysisResult?.points || 0} green points!`,
      [
        {
          text: 'View Profile',
          onPress: () => navigation.navigate('MainTabs', { screen: 'Profile' })
        },
        { text: 'Continue', onPress: handleRetakePhoto }
      ]
    );
  };

  const requestCameraPermission = () => {
    Alert.alert(
      'Camera Permission',
      'EcoConnect needs camera access to scan and classify waste items.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Grant Permission', 
          onPress: () => {
            setHasPermission(true);
            Alert.alert('Success', 'Camera permission granted!');
          }
        }
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            To scan and classify waste items, EcoConnect needs access to your camera.
          </Text>
          <Button
            title="Grant Camera Permission"
            onPress={requestCameraPermission}
            style={styles.permissionButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionIcon}>❌</Text>
          <Text style={styles.permissionTitle}>Camera Access Denied</Text>
          <Text style={styles.permissionText}>
            Please enable camera access in your device settings to use this feature.
          </Text>
          <Button
            title="Try Again"
            onPress={() => setHasPermission(null)}
            style={styles.permissionButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (showResults && analysisResult) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.resultsContainer}>
          {/* Header */}
          <View style={styles.resultsHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleRetakePhoto}
            >
              <Text style={styles.backButtonText}>← Retake</Text>
            </TouchableOpacity>
            <Text style={styles.resultsTitle}>Analysis Complete</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Results Card */}
          <Card style={styles.resultsCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.wasteTypeIcon}>♻️</Text>
              <View style={styles.wasteTypeInfo}>
                <Text style={styles.wasteType}>{analysisResult.wasteType}</Text>
                <Text style={styles.confidence}>
                  {Math.round(analysisResult.confidence * 100)}% confidence
                </Text>
              </View>
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsText}>+{analysisResult.points}</Text>
              </View>
            </View>

            <View style={styles.disposalSection}>
              <Text style={styles.sectionTitle}>Disposal Method</Text>
              <Text style={styles.disposalMethod}>{analysisResult.disposalMethod}</Text>
            </View>

            <View style={styles.tipsSection}>
              <Text style={styles.sectionTitle}>Recycling Tips</Text>
              {analysisResult.tips.map((tip: string, index: number) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              title="Save Result"
              onPress={handleSaveResult}
              style={styles.saveButton}
            />
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => Alert.alert('Share', 'Sharing functionality coming soon!')}
            >
              <Text style={styles.shareButtonText}>Share Achievement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Camera View */}
      <View style={styles.cameraContainer}>
        {/* Mock camera preview */}
        <View style={styles.cameraPreview}>
          <Text style={styles.cameraPlaceholder}>📷</Text>
          <Text style={styles.cameraText}>Camera Preview</Text>
          <Text style={styles.cameraSubtext}>Point camera at waste item</Text>
        </View>

        {/* Overlay UI */}
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>Scan Waste</Text>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
          </View>

          {/* Scanning Frame */}
          <View style={styles.scanningFrame}>
            <View style={styles.frameCorner} />
            <View style={[styles.frameCorner, styles.frameCornerTopRight]} />
            <View style={[styles.frameCorner, styles.frameCornerBottomLeft]} />
            <View style={[styles.frameCorner, styles.frameCornerBottomRight]} />
            
            {isAnalyzing && (
              <View style={styles.analyzingOverlay}>
                <LoadingSpinner size="large" color="white" />
                <Text style={styles.analyzingText}>Analyzing...</Text>
              </View>
            )}
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.galleryButton}>
              <Text style={styles.galleryButtonText}>📁</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.captureButton, isAnalyzing && styles.captureButtonDisabled]}
              onPress={handleCaptureImage}
              disabled={isAnalyzing}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.flashButton}>
              <Text style={styles.flashButtonText}>⚡</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              Position the waste item within the frame and tap to capture
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  permissionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  permissionButton: {
    minWidth: 200,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    fontSize: 80,
    marginBottom: SPACING.md,
  },
  cameraText: {
    fontSize: FONT_SIZES.lg,
    color: 'white',
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  cameraSubtext: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255,255,255,0.7)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  topBarTitle: {
    fontSize: FONT_SIZES.lg,
    color: 'white',
    fontWeight: '600',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: 'white',
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  scanningFrame: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    right: '15%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.primary,
    borderWidth: 3,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  frameCornerTopRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 0,
  },
  frameCornerBottomLeft: {
    bottom: 0,
    top: 'auto',
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderRightWidth: 0,
  },
  frameCornerBottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    color: 'white',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginTop: SPACING.md,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButtonText: {
    fontSize: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButtonText: {
    fontSize: 24,
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    left: SPACING.md,
    right: SPACING.md,
  },
  instructionText: {
    color: 'white',
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SPACING.sm,
    borderRadius: 8,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  resultsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  placeholder: {
    width: 60,
  },
  resultsCard: {
    margin: SPACING.md,
    padding: SPACING.lg,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  wasteTypeIcon: {
    fontSize: 48,
    marginRight: SPACING.md,
  },
  wasteTypeInfo: {
    flex: 1,
  },
  wasteType: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  confidence: {
    fontSize: FONT_SIZES.md,
    color: COLORS.success,
    fontWeight: '600',
  },
  pointsBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  pointsText: {
    color: 'white',
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  disposalSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  disposalMethod: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    backgroundColor: COLORS.primary + '10',
    padding: SPACING.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  tipsSection: {
    marginBottom: SPACING.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  tipBullet: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  actionButtons: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  shareButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});