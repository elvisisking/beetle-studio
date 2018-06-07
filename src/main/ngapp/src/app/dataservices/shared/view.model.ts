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

/**
 * View model
 */
export class View {
  private keng__id: string;
  private description: string;
  private isSelected = false;
  private isValid = false;
  private isEditable = false;
  private sources: SchemaNode[] = [];

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
   * @param {string} name the view description
   */
  public setDescription( description?: string ): void {
    this.description = description ? description : null;
  }

  /**
   * @returns {SchemaNode[]} the view sources
   */
  public getSources(): SchemaNode[] {
    return this.sources;
  }

  /**
   * @param {SchemaNode[]} sources the view sources
   */
  public setSources( sources: SchemaNode[] ): void {
    this.sources = sources;
  }

  /**
   * Determine whether the view is in a valid state
   * @returns {boolean} true if valid
   */
  public get valid(): boolean {
    return this.keng__id != null && this.sources.length > 0;
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
