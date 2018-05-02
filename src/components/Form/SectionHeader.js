import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { color, server } from '../../config';
import styles from './styles';

const SectionHeader = ({ section }) => ((section.title) ?
    <View style={[styles.sectionHeader.container]} >
        {section.title && <Text style={styles.sectionHeader.text} >{section.title}</Text>}
    </View> : undefined
)
export default SectionHeader;