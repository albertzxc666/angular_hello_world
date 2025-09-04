import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface VehicleInfo {
  id: string;
  model: string;
  year: number;
  color: string;
  // Добавьте другие поля согласно вашему API
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private apiService: ApiService) {}

  /**
   * Получить информацию о транспортном средстве
   */
  getVehicleInfo(vehicleId?: string): Observable<VehicleInfo> {
    const endpoint = '/prd/autoconcierge-gate/vehicle/getVehicleInfo';
    
    if (vehicleId) {
      // Если нужен параметр vehicleId
      return this.apiService.get<VehicleInfo>(`${endpoint}?vehicleId=${vehicleId}`);
    } else {
      // Если параметры не нужны
      return this.apiService.get<VehicleInfo>(endpoint);
    }
  }

  /**
   * Пример POST запроса
   */
  createVehicle(vehicleData: Partial<VehicleInfo>): Observable<VehicleInfo> {
    return this.apiService.post<VehicleInfo>('/prd/autoconcierge-gate/vehicle/create', vehicleData);
  }

  /**
   * Пример PUT запроса
   */
  updateVehicle(vehicleId: string, vehicleData: Partial<VehicleInfo>): Observable<VehicleInfo> {
    return this.apiService.put<VehicleInfo>(`/prd/autoconcierge-gate/vehicle/${vehicleId}`, vehicleData);
  }

  /**
   * Пример DELETE запроса
   */
  deleteVehicle(vehicleId: string): Observable<void> {
    return this.apiService.delete<void>(`/prd/autoconcierge-gate/vehicle/${vehicleId}`);
  }
}