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

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { LoggerService } from "@core/logger.service";
import { ViewEditorEvent } from "@dataservices/virtualization/view-editor/event/view-editor-event";
import { ViewEditorEventType } from "@dataservices/virtualization/view-editor/event/view-editor-event-type.enum";
import { ViewEditorService } from "@dataservices/virtualization/view-editor/view-editor.service";
import { EmptyStateConfig, NgxDataTableConfig, TableConfig } from "patternfly-ng";
import { QueryResults } from "@dataservices/shared/query-results.model";
import { ColumnData } from "@dataservices/shared/column-data.model";
import { RowData } from "@dataservices/shared/row-data.model";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-view-preview",
  templateUrl: "./view-preview.component.html",
  styleUrls: ["./view-preview.component.css"]
})
export class ViewPreviewComponent implements OnInit {

  public columns: any[] = [];
  public ngxConfig: NgxDataTableConfig;
  public tableConfig: TableConfig;
  public rows: any[] = [];

  private emptyStateConfig: EmptyStateConfig;
  private logger: LoggerService;
  private editorService: ViewEditorService;

  /**
   * @param {ViewEditorService} editorService the editor service
   * @param {LoggerService} logger the logger
   */
  constructor( editorService: ViewEditorService,
               logger: LoggerService ) {
    this.editorService = editorService;
    this.logger = logger;
  }

  private clearResults(): void {
    if ( this.rows && this.columns ) {
      if ( this.rows.length !== 0 || this.columns.length !== 0 ) {
        this.rows = [];
        this.columns = [];
      }
    }
  }

  /**
   * @param {ViewEditorEvent} event the event being processed
   */
  public handleEditorEvent( event: ViewEditorEvent ): void {
    if ( event.type === ViewEditorEventType.PREVIEW_RESULTS_CHANGED ) {
      const results = this.editorService.getPreviewResults();

      if ( results ) {
        this.reload( results );
      } else {
        this.clearResults();
      }
    } else if ( event.type === ViewEditorEventType.VIEW_VALID_CHANGED ) {
      if ( !this.editorService.viewIsValid() ) {
        this.clearResults();
      }
    }
  }

  public ngOnInit(): void {
    this.ngxConfig = {
      headerHeight: 100,
      scrollbarH: true,
      scrollbarV: true,
    } as NgxDataTableConfig;

    this.emptyStateConfig = {
      title: "Unable to preview data"
    } as EmptyStateConfig;

    this.tableConfig = {
      emptyStateConfig: this.emptyStateConfig
    } as TableConfig;
  }

  private reload( results: QueryResults ): void {
    if ( !results ) {
      this.logger.debug( "ViewPreviewComponent.reload called with no results" );
      this.clearResults();
      return;
    }

    this.columns.length = 0;
    this.rows.length = 0;

    const columnData: ColumnData[] = results.getColumns();
    const rowData: RowData[] = results.getRows();
    this.logger.debug( "ViewPreviewComponent.reload called with ${rowData.length} result rows" );

    // Define the row data
    let firstTime = true;
    const rowNumHeader = "ROW #";

    for ( let rowIndex = 0; rowIndex < rowData.length; rowIndex++ ) {
      const row = rowData[ rowIndex ];
      const data = row.getData();

      const dataRow = {};
      dataRow[ rowNumHeader ] = rowIndex + 1;

      for ( let colIndex = 0; colIndex < data.length; colIndex++ ) {
        const label = columnData[ colIndex ].getLabel();
        dataRow[ label ] = data[ colIndex ];
      }

      this.rows.push( dataRow );
      firstTime = false;
    }

    // setup row number column
    const column = {
      canAutoResize: true,
      draggable: false,
      maxWidth: 60,
      minWidth: 60,
      name: rowNumHeader,
      prop: rowNumHeader,
      resizable: true,
      sortable: true,
      width: 60,
      cellClass: "row-number-column" };
    this.columns.push( column );

    // Setup data columns
    for ( const colData of columnData ) {
      const label = colData.getLabel();
      const col = {
        canAutoResize: true,
        draggable: false,
        name: label.toUpperCase(),
        prop: label,
        resizable: true,
        sortable: true };
      this.columns.push( col );
    }
  }

}
