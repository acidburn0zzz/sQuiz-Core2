import React from 'react';
import { View } from 'react-native';
import { EmitRoom } from 'shared/src/typings/Room';

import { ResponsiveContainer } from '../../../components/Containers';
import HomeNews from '../HomeNews';
import HomeRooms from '../HomeRooms/HomeRooms';
import ProfileContainer from '../ProfileContainer';
import useHomeContainerStyle from './HomeContainerStyle';

type HomeContainerProp = {
  rooms: EmitRoom[];
};

export default function HomeContainer({ rooms }: HomeContainerProp) {
  const styles = useHomeContainerStyle();
  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.info}>
        <ProfileContainer />
        <HomeNews />
      </View>
      <View style={styles.rooms}>
        <HomeRooms rooms={rooms} />
      </View>
    </ResponsiveContainer>
  );
}
