/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export enum ViewEditorEventType {

  /**
   * An event indicating the selection of objects in the canvas has changed.
   */
  CANVAS_SELECTION_CHANGED = "CANVAS_SELECTION_CHANGED",

  /**
   * An event indicating the editor configuration has changed.
   */
  EDITOR_CONFIG_CHANGED = "EDITOR_CONFIG_CHANGED",

  /**
   * An event indicating a log message has been added.
   */
  LOG_MESSAGE_ADDED = "LOG_MESSAGE_ADDED",

  /**
   * An event indicating a log message has been deleted.
   */
  LOG_MESSAGE_DELETED = "LOG_MESSAGE_DELETED",

  /**
   * An event indicating all log messages have been deleted.
   */
  LOG_MESSAGES_CLEARED = "LOG_MESSAGES_CLEARED",

  /**
   * An event indicating the preview results have changed.
   */
  PREVIEW_RESULTS_CHANGED = "PREVIEW_RESULTS_CHANGED",

  /**
   * An event indication the editor's readonly property has changed.
   */
  READONLY_CHANGED = "READONLY_CHANGED",

  /**
   * An event indicating the view has been set.
   */
  VIEW_CHANGED = "VIEW_CHANGED",

  /**
   * An event indicating the view description has changed.
   */
  VIEW_DESCRIPTION_CHANGED = "VIEW_DESCRIPTION_CHANGED",

  /**
   * An event indicating the view name has changed.
   */
  VIEW_NAME_CHANGED = "VIEW_NAME_CHANGED",

  /**
   * An event indication the view validation status has changed.
   * @type {string}
   */
  VIEW_VALID_CHANGED = "VIEW_VALID_CHANGED"

}
