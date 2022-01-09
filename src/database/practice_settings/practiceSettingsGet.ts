import {
  DEFAULT_PRACTICE_SETTINGS,
  IPracticeCustomText,
  IPracticeMedleyCollection,
  IPracticeSettings,
  IPracticeSettingsProfile,
} from 'keycap-foundation';
import mongoose from 'mongoose';
import convertMongooseObjectArray from '../convertMongooseObjectArray';
import practiceSettingsCreate from './practiceSettingsCreate';
import practiceSettingsModel from './practiceSettingsModel';

// Info regarding type of userId: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12385
export default async function practiceSettingsGet(
  userId: mongoose.Schema.Types.ObjectId,
) {
  const settingsDoc = await practiceSettingsModel.findOne({ userId });
  if (settingsDoc === null) {
    await practiceSettingsCreate(userId, DEFAULT_PRACTICE_SETTINGS);
    return DEFAULT_PRACTICE_SETTINGS;
  }

  const settings = convertDocumentToPracticeSettings(settingsDoc);
  return settings;
}

function convertDocumentToPracticeSettings(doc: any): IPracticeSettings {
  const bc = doc.currentConfig.basic.config;
  const ac = doc.currentConfig.advanced.config;

  const convertedObject = {
    currentConfig: {
      basic: {
        config: {
          caretDelay: bc.caretDelay,
          caretStyle: bc.caretStyle,
          countdownLength: bc.countdownLength,
          customTextActive: bc.customTextActive,
          isInstantDeathEnabled: bc.isInstantDeathEnabled,
          isKeyboardVisualEnabled: bc.isKeyboardVisualEnabled,
          isPunctuationEnabled: bc.isPunctuationEnabled,
          isResultRecordingEnabled: bc.isResultRecordingEnabled,
          medleyCollectionsActive: bc.medleyCollectionsActive,
          medleyItemCount: bc.medleyItemCount,
          medleyPunctuationFrequency: bc.medleyPunctuationFrequency,
          mistakeHighlightStyle: bc.mistakeHighlightStyle,
          quoteLength: bc.quoteLength,
          soundVolume: bc.soundVolume,
          textCasing: bc.textCasing,
          textType: bc.textType,
        },
        pinned: doc.currentConfig.basic.pinned,
      },
      advanced: {
        config: {
          medleyCollectionsCustom:
            convertMongooseObjectArray<IPracticeMedleyCollection>(
              ac.medleyCollectionsCustom,
              ['name', 'items'],
            ),
          customTexts: convertMongooseObjectArray<IPracticeCustomText>(
            ac.customTexts,
            ['name', 'content'],
          ),
        },
        pinned: doc.currentConfig.advanced.pinned,
      },
    },
    profiles: convertMongooseObjectArray<IPracticeSettingsProfile>(
      doc.profiles,
      ['name', 'config'],
    ),
  };

  return convertedObject;
}
