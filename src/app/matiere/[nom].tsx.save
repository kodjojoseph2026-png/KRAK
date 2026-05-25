import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CourseScreen() {
  const { nom } = useLocalSearchParams();
  const router = useRouter();
  const [ongletActif, setOngletActif] = useState('videos');
  const [videoSelectionnee, setVideoSelectionnee] = useState<string | null>(null);
  const [modeSourdActif, setModeSourdActif] = useState(false); // État pour activer l'avatar 3D mimer

  const [videos, setVideos] = useState([
    { id: 1, titre: "01. Chapitre 1 : Explication du prof (Direct local)", duree: "15 min", source: "KRAK Vidéo", locale: true },
    { id: 2, titre: "02. Chapitre 1 : Exercice d'application au tableau", duree: "22 min", source: "KRAK Vidéo", locale: true },
    { id: 3, titre: "03. Chapitre 2 : Notions clés fondamentales", duree: "18 min", source: "YouTube", locale: false },
    { id: 4, titre: "04. Astuces de mémorisation rapide", duree: "12 min", source: "KRAK Vidéo", locale: true },
  ]);

  const [exercices, setExercices] = useState([
    { id: 1, titre: "Fiche d'exercice - Chapitre 1", source: "Fasomoutra", points: "Sujet Complet" },
    { id: 2, titre: "Sujet de devoir blanc", source: "Fasomoutra", points: "Coeff 4" },
    { id: 3, titre: "Fiche d'évaluation rapide", source: "Toupty", points: "Auto-évaluation" },
  ]);

  const [partages, setPartages] = useState([
    { id: 1, titre: `Devoir 1 (${nom || 'Maths'}) - Lycée Scientifique Yakro`, date: "Il y a 2h", auteur: "Kodjo" },
    { id: 2, titre: `Interro surprise (${nom || 'Physique'}) - Lycée Classique Abidjan`, date: "Hier", auteur: "Anonyme" },
  ]);

  const gererPartageDevoir = () => {
    const nouveauxDevoirs = [
      {
        id: Date.now(),
        titre: `Devoir de classe (${nom || 'Science'}) - Lycée Mamie Adjoua`,
        date: "À l'instant",
        auteur: "Moi (KRAK-Dev)"
      },
      ...partages
    ];
    setPartages(nouveauxDevoirs);
    setOngletActif('partages');
    Alert.alert("🎉 Devoir partagé !", "Ajouté avec succès dans l'onglet des partages.");
  };

  const lancerVideo = (video: typeof videos[0]) => {
    if (video.locale) {
      setVideoSelectionnee(video.titre);
      setModeSourdActif(false); // On réinitialise l'avatar à l'ouverture
    } else {
      Linking.openURL('https://youtube.com');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barre du haut */}
      <View style={styles.topBar}>
       <TouchableOpacity style={styles.voirButton} onPress={() => router.push('/matiere/devoir')}>
          <Text style={styles.backText}>‹ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>{nom || "Matière"}</Text>
      </View>

      {/* Sélecteur d'onglets */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, ongletActif === 'videos' && styles.tabActive]} onPress={() => setOngletActif('videos')}>
          <Text style={[styles.tabText, ongletActif === 'videos' && styles.tabTextActive]}>Vidéos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, ongletActif === 'exercices' && styles.tabActive]} onPress={() => setOngletActif('exercices')}>
          <Text style={[styles.tabText, ongletActif === 'exercices' && styles.tabTextActive]}>Fiches (Faso/Toupty)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, ongletActif === 'partages' && styles.tabActive]} onPress={() => setOngletActif('partages')}>
          <Text style={[styles.tabText, ongletActif === 'partages' && styles.tabTextActive]}>Devoirs ({partages.length})</Text>
        </TouchableOpacity>
      </View>

      {/* Liste du contenu */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ongletActif === 'videos' && videos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.itemCard} onPress={() => lancerVideo(video)}>
            <View style={[styles.iconCircle, { backgroundColor: video.locale ? '#00875f' : '#ef4444' }]}>
              <Text style={{color: '#fff'}}>{video.locale ? '👨‍🏫' : '▶'}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.itemTitle}>{video.titre}</Text>
              <Text style={styles.itemSub}>{video.source} • {video.duree}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {ongletActif === 'exercices' && exercices.map((exo) => (
          <TouchableOpacity key={exo.id} style={styles.itemCard} onPress={() => Linking.openURL('https://google.com')}>
            <View style={[styles.iconCircle, { backgroundColor: exo.source === 'Fasomoutra' ? '#ff9800' : '#2196f3' }]}>
              <Text style={{fontSize: 16}}>📄</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.itemTitle}>{exo.titre}</Text>
              <Text style={styles.itemSub}>Source : <Text style={{color: '#fff', fontWeight: 'bold'}}>{exo.source}</Text> • {exo.points}</Text>
           </View>
          </TouchableOpacity>
        ))}

        {ongletActif === 'partages' && partages.map((partage) => (
          <View key={partage.id} style={styles.itemCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#9c27b0' }]}>
              <Text style={{fontSize: 16}}>📸</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.itemTitle}>{partage.titre}</Text>
              <Text style={styles.itemSub}>Posté par {partage.auteur} • {partage.date}</Text>
            </View>
<TouchableOpacity style={styles.voirButton} onPress={() => router.push('/devoir')}>
              <Text style={styles.voirButtonText}>Traiter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.voirButton} onPress={() => Alert.alert("Sujet", "Ici s'affichera la photo.")}>
              <Text style={styles.voirButtonText}>Traiter</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Lecteur Vidéo Intégré avec Option Avatar 3D (Modal) */}
      <Modal visible={videoSelectionnee !== null} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.videoPlayerBox}>
            
            {/* Entête du lecteur avec bouton d'accessibilité */}
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalVideoTitle} numberOfLines={1}>{videoSelectionnee}</Text>
              <TouchableOpacity 
                style={[styles.btnAccessibilite, modeSourdActif && styles.btnAccessibiliteActive]} 
                onPress={() => setModeSourdActif(!modeSourdActif)}
              >
                <Text style={styles.btnAccessibiliteText}>{modeSourdActif ? "🟢 Avatar 3D Actif" : "🧏‍♂️ Activer Avatar 3D"}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Zone de rendu : Écran principal + Écran Avatar si activé */}
            <View style={[styles.renderZone, modeSourdActif && styles.renderZoneSplit]}>
              
              {/* Écran du cours de prof */}
              <View style={styles.fakeVideoScreen}>
                <Text style={{ fontSize: 40 }}>👨‍🏫</Text>
                <Text style={{ color: '#fff', marginTop: 10, fontWeight: '600', textAlign: 'center' }}>Cours en cours...</Text>
              </View>

              {/* ÉCRAN DE L'AVATAR 3D POUR ÉLÈVES SOURDS */}
              {modeSourdActif && (
                <View style={styles.avatar3DContainer}>
                  <Text style={{ fontSize: 50 }}>🤖👋</Text>
                  <Text style={styles.avatarText}>Avatar KRAK 3D</Text>
                  <Text style={styles.avatarSubText}>Mime les gestes en langue des signes (LS) en temps réel</Text>
                  <View style={styles.waveIndicator}>
                    <Text style={{fontSize: 11, color: '#00ff4c'}}>• Synchronisation active</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Bouton Fermer */}
            <TouchableOpacity style={styles.closePlayerButton} onPress={() => setVideoSelectionnee(null)}>
              <Text style={styles.closePlayerButtonText}>Fermer le lecteur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bouton fixe en bas */}
      <View style={styles.bottomActionArea}>
        <TouchableOpacity style={styles.shareButton} onPress={gererPartageDevoir}>
          <Text style={styles.shareButtonText}>📸 Ajouter mon devoir de classe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  topBar: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#29292e' },
  backButton: { marginRight: 16, backgroundColor: '#202024', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  backText: { color: '#a8a8b3', fontSize: 15, fontWeight: '600' },
  topBarTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', flex: 1 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#202024', padding: 6, borderRadius: 8, margin: 16 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 6 },
  tabActive: { backgroundColor: '#00875f' },
  tabText: { color: '#a8a8b3', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#ffffff' },
  scrollContainer: { paddingHorizontal: 16, paddingBottom: 100 },
  itemCard: { backgroundColor: '#202024', flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#29292e' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  itemTitle: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  itemSub: { color: '#8d8d99', fontSize: 13, marginTop: 3 },
  voirButton: { backgroundColor: '#29292e', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  voirButtonText: { color: '#e1e1e6', fontSize: 12, fontWeight: '600' },
  bottomActionArea: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#121214', padding: 16, borderTopWidth: 1, borderColor: '#29292e' },
  shareButton: { backgroundColor: '#00875f', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  shareButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  
  // Lecteur vidéo et header
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  videoPlayerBox: { backgroundColor: '#202024', width: '100%', maxWidth: 900, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#29292e' },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 },
  modalVideoTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', flex: 1 },
  
  // Bouton accessibilité sourds
  btnAccessibilite: { backgroundColor: '#29292e', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#00875f' },
  btnAccessibiliteActive: { backgroundColor: '#00875f' },
  btnAccessibiliteText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  
  // Zones de rendu vidéo et avatar split view
  renderZone: { width: '100%', gap: 12 },
  renderZoneSplit: { flexDirection: 'row', flexWrap: 'wrap' },
  fakeVideoScreen: { backgroundColor: '#000', flex: 1, minWidth: 280, height: 280, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#323238' },
  
  // Conteneur de l'avatar mimer
  avatar3DContainer: { backgroundColor: '#1a1a1e', flex: 1, minWidth: 280, height: 280, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#00875f', padding: 16 },
  avatarText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginTop: 8 },
  avatarSubText: { color: '#8d8d99', fontSize: 12, textAlign: 'center', marginTop: 4, paddingHorizontal: 10 },
  waveIndicator: { backgroundColor: '#202024', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 10 },
  
  closePlayerButton: { backgroundColor: '#ef4444', marginTop: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  closePlayerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});
