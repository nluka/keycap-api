import { IPracticeSettings } from 'keycap-foundation';
import mongoose from 'mongoose';

export interface ISchemaPracticeSettings extends IPracticeSettings {
  userId: mongoose.Schema.Types.ObjectId;
}

const configObject = {
  basic: {
    config: {
      caretDelay: { type: Number, required: true },
      caretStyle: { type: String, required: true },
      countdownLength: { type: Number, required: true },
      customTextActive: {
        type: String,
        default: null,
      },
      isInstantDeathEnabled: { type: Boolean, required: true },
      isKeyboardVisualEnabled: { type: Boolean, required: true },
      isPunctuationEnabled: { type: Boolean, required: true },
      isResultRecordingEnabled: { type: Boolean, required: true },
      medleyCollectionsActive: { type: [String], required: true },
      medleyItemCount: { type: Number, required: true },
      medleyPunctuationFrequency: { type: Number, required: true },
      mistakeHighlightStyle: { type: String, required: true },
      quoteLength: {
        type: {
          min: { type: Number, required: true, min: 1 },
          max: { type: Number, required: true },
        },
        required: true,
      },
      soundVolume: { type: Number, required: true },
      textCasing: { type: String, required: true },
      textType: { type: String, required: true },
    },
    pinned: { type: [String], required: true, default: [] },
  },
  advanced: {
    config: {
      medleyCollectionsCustom: {
        type: [
          {
            name: { type: String, required: true },
            items: { type: [String], default: '' },
          },
        ],
        default: [],
      },
      customTexts: {
        type: [
          {
            name: { type: String, required: true },
            content: { type: String, default: '' },
          },
        ],
        default: [],
      },
    },
    pinned: { type: [String], required: true, default: [] },
  },
};

const practiceSettingsSchema = new mongoose.Schema<ISchemaPracticeSettings>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

  currentConfig: { type: configObject, required: true },

  profiles: {
    type: [
      {
        name: { type: String, required: true },
        config: { type: configObject, required: true },
      },
    ],
    required: true,
  },
});

const practiceSettingsModel = mongoose.model(
  'practice-settings',
  practiceSettingsSchema,
);
export default practiceSettingsModel;
