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

import { Injectable, ReflectiveInjector } from "@angular/core";
import { Http } from "@angular/http";
import { AppSettingsService } from "@core/app-settings.service";
import { LoggerService } from "@core/logger.service";
import { NotifierService } from "@dataservices/shared/notifier.service";
import { VdbModelSource } from "@dataservices/shared/vdb-model-source.model";
import { VdbModel } from "@dataservices/shared/vdb-model.model";
import { VdbStatus } from "@dataservices/shared/vdb-status.model";
import { Vdb } from "@dataservices/shared/vdb.model";
import { VdbService } from "@dataservices/shared/vdb.service";
import { Virtualization } from "@dataservices/shared/virtualization.model";
import { TestDataService } from "@shared/test-data.service";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { SchemaNode } from "@connections/shared/schema-node.model";
import { Connection } from "@connections/shared/connection.model";
import { View } from "@dataservices/shared/view.model";

@Injectable()
export class MockVdbService extends VdbService {

  private testDataService: TestDataService;

  constructor(http: Http, appSettings: AppSettingsService, notifierService: NotifierService, logger: LoggerService ) {
    super(http, appSettings, notifierService, logger);

    // Inject service for test data
    const injector = ReflectiveInjector.resolveAndCreate([TestDataService]);
    const testDataService = injector.get(TestDataService);

    this.testDataService = testDataService;
  }

  /**
   * Get the vdbs from the komodo rest interface
   * @returns {Observable<Vdb[]>}
   */
  public getVdbs(): Observable<Vdb[]> {
    return Observable.of(this.testDataService.getVdbs());
  }

  /**
   * Get the vdbs from the komodo rest interface
   * @returns {Observable<Vdb[]>}
   */
  public getTeiidVdbStatuses(): Observable<VdbStatus[]> {
    return Observable.of(this.testDataService.getVdbStatuses());
  }

  /**
   * Create a vdb via the komodo rest interface
   * @param {Vdb} vdb
   * @returns {Observable<boolean>}
   */
  public createVdb(vdb: Vdb): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Create a vdb via the komodo rest interface
   * @param {string} vdbName
   * @param {VdbModel} vdbModel
   * @returns {Observable<boolean>}
   */
  public createVdbModel(vdbName: string, vdbModel: VdbModel): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Create a vdbModelSource via the komodo rest interface
   * @param {string} vdbName the vdb name
   * @param {string} modelName the model name
   * @param {VdbModelSource} vdbModelSource the modelsource name
   * @returns {Observable<boolean>}
   */
  public createVdbModelSource(vdbName: string, modelName: string, vdbModelSource: VdbModelSource): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Get the views from the specified Vdb model from the komodo rest interface
   * @param {string} vdbName the vdb name
   * @param {string} modelName the model name
   * @returns {Observable<View[]>}
   */
  public getVdbModelViews(vdbName: string, modelName: string): Observable<View[]> {
    return Observable.of(this.testDataService.getViews(vdbName, modelName));
  }

  /**
   * Creates the Vdb Model Views via the komodo rest interface
   * @param {string} vdbName the vdb name
   * @param {string} modelName the model name
   * @param {string[]} viewNames the view names
   * @param {SchemaNode[]} sourceNodes the source node for each view
   * @param {Connection[]} connections the array of available active connections
   * @returns {Observable<boolean>}
   */
  public setVdbModelViews(vdbName: string, modelName: string, viewNames: string[],
                          sourceNodes: SchemaNode[], connections: Connection[]): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Delete a vdb via the komodo rest interface
   * @param {string} vdbId
   * @returns {Observable<boolean>}
   */
  public deleteVdb(vdbId: string): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Deploys the workspace VDB with the provided name
   * @param {string} vdbName
   * @returns {Observable<boolean>}
   */
  public deployVdb(vdbName: string): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Undeploy a vdb from the teiid server
   * @param {string} vdbId
   * @returns {Observable<boolean>}
   */
  public undeployVdb(vdbId: string): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Polls the server for the specified VDB.  Polling will terminate if
   * (1) The VDB is active
   * (2) The VDB is in a failed state
   * (3) The polling duration has lapsed
   * @param {string} vdbName the name of the VDB
   * @param {number} pollDurationSec the duration (sec) to poll the server
   * @param {number} pollIntervalSec the interval (sec) between polling attempts
   */
  public pollForActiveVdb(vdbName: string, pollDurationSec: number, pollIntervalSec: number): void {
    const pollIntervalMillis = pollIntervalSec * 1000;
    const timer = Observable.timer(1000, pollIntervalMillis);
    this.deploymentSubscription = timer.subscribe(( t: any ) => {
      const vdbStatus = new VdbStatus();
      vdbStatus.setName( vdbName );
      vdbStatus.setActive( true );
      vdbStatus.setLoading( false );
      vdbStatus.setFailed( false );

      this.notifierService.sendVdbDeploymentStatus( vdbStatus );
      this.deploymentSubscription.unsubscribe();
    } );

  }

  public getVirtualizations(): Observable< Virtualization[] > {
    return Observable.of( this.testDataService.getVirtualizations() );
  }

  public deleteView(vdbName: string, modelName: string, viewName: string): Observable<boolean> {
    return Observable.of(true);
  }

}
