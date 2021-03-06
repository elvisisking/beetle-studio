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

import { SchemaNode } from "@connections/shared/schema-node.model";
import { VdbsConstants } from "@dataservices/shared/vdbs-constants";
import { PathUtils } from "@dataservices/shared/path-utils";

/**
 * View model
 */
export class View {
  private keng__id: string;
  private description: string;
  private isSelected = false;
  private isEditable = false;
  private sourcePaths: string[] = [];

  /**
   * @param {Object} json the JSON representation of a View
   * @returns {View} the new View (never null)
   */
  public static create( json: object = {} ): View {
    const view = new View();
    view.setValues( json );
    return view;
  }

  constructor() {
    // nothing to do
  }

  /**
   * @returns {string} the table name
   */
  public getName(): string {
    return this.keng__id;
  }

  /**
   * @param {string} name the table name
   */
  public setName( name?: string ): void {
    this.keng__id = name ? name : null;
  }

  /**
   * @returns {string} the view description
   */
  public getDescription(): string {
    return this.description;
  }

  /**
   * @param {string} description the view description
   */
  public setDescription( description?: string ): void {
    this.description = description ? description : null;
  }

  /**
   * @returns {string[]} the view source paths
   */
  public getSourcePaths(): string[] {
    return this.sourcePaths;
  }

  /**
   * @param {string[]} sourcePaths the view source paths
   */
  public setSourcePaths( sourcePaths: string[] = [] ): void {
    this.sourcePaths = sourcePaths;
  }

  /**
   * Get the SQL for the view, given the current selections
   * @returns {string} the view SQL
   */
  public getSql(): string {
    // The view currently supports single source only
    let sourceNodeName = "unknownSource";
    let connectionName = "unknownConnection";
    const sourcePath = this.getSourcePaths()[ 0 ];
    if ( sourcePath !== null ) {
      sourceNodeName = PathUtils.getSourceName(sourcePath);
      if ( PathUtils.getConnectionName(sourcePath) !== null ) {
        connectionName = PathUtils.getConnectionName(sourcePath);
      }
    }

    // Return SQL for this view
    return "SELECT * FROM " + connectionName.toLowerCase() + VdbsConstants.SCHEMA_MODEL_SUFFIX + "." + sourceNodeName + ";";
  }

  /**
   * Add source path to the list of source paths
   *
   * @param {string} sourcePathToAdd the source path to add
   */
  public addSourcePath( sourcePathToAdd: string ): void {
    const index = this.sourcePaths.findIndex( ( sPath ) =>
      sPath === sourcePathToAdd
    );

    if ( index === -1 ) {
      this.sourcePaths.push( sourcePathToAdd );
    }
  }

  /**
   * Add source paths to the list of source paths.
   *
   * @param {string[]} sourcePathsToAdd the source paths being added
   */
  public addSourcePaths( sourcePathsToAdd: string[] = [] ): void {
    const self = this;

    sourcePathsToAdd.forEach( ( sourcePath ) => {
      self.addSourcePath( sourcePath );
    } );
  }

  /**
   * @param {string} sourcePathToRemove the source path to remove
   */
  public removeSourcePath( sourcePathToRemove: string ): void {
    const index = this.sourcePaths.findIndex( ( sourcePath ) =>
      sourcePath === sourcePathToRemove );

    if ( index !== -1 ) {
      this.sourcePaths.splice( index, 1 );
    }
  }

  /**
   * @param {SchemaNode} sourcePathsToRemove the source paths to remove
   */
  public removeSourcePaths( sourcePathsToRemove: string[] ): void {
    const self = this;

    sourcePathsToRemove.forEach( ( sourcePath ) => {
      self.removeSourcePath( sourcePath );
    } );
  }

  /**
   * Determine whether the view is in a valid state
   * @returns {boolean} true if valid
   */
  public get valid(): boolean {
    return this.keng__id != null && this.sourcePaths.length > 0;
  }

  /**
   * @returns {boolean} true if selected
   */
  public get selected(): boolean {
    return this.isSelected;
  }

  /**
   * @param {boolean} selected 'true' if selected
   */
  public set selected( selected: boolean ) {
    this.isSelected = selected;
  }

  /**
   * @returns {boolean} true if editable
   */
  public get editable(): boolean {
    return this.isEditable;
  }

  /**
   * @param {boolean} editable 'true' if editable
   */
  public set editable( editable: boolean ) {
    this.isEditable = editable;
  }

  /**
   * Set all object values using the supplied View json
   * @param {Object} values
   */
  public setValues(values: object = {}): void {
    Object.assign(this, values);
  }

}
