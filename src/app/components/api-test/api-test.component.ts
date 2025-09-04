import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService, VehicleInfo } from '../../services/vehicle.service';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="api-test-container">
      <h2>Тест подключения к API</h2>
      
      <div class="test-section">
        <button (click)="testGetVehicleInfo()" [disabled]="loading">
          {{ loading ? 'Загрузка...' : 'Тест getVehicleInfo' }}
        </button>
        
        <div *ngIf="result" class="result">
          <h3>Результат:</h3>
          <pre>{{ result | json }}</pre>
        </div>
        
        <div *ngIf="error" class="error">
          <h3>Ошибка:</h3>
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .test-section {
      margin-top: 20px;
    }
    
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    
    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    
    .result, .error {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
    }
    
    .result {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
    }
    
    .error {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
    }
    
    pre {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class ApiTestComponent implements OnInit {
  loading = false;
  result: any = null;
  error: string | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    console.log('API Test Component инициализирован');
  }

  testGetVehicleInfo(): void {
    this.loading = true;
    this.result = null;
    this.error = null;

    this.vehicleService.getVehicleInfo().subscribe({
      next: (data: VehicleInfo) => {
        this.loading = false;
        this.result = data;
        console.log('Успешный ответ от API:', data);
      },
      error: (error) => {
        this.loading = false;
        this.error = `Ошибка: ${error.status} - ${error.message || error.statusText}`;
        console.error('Ошибка API:', error);
      }
    });
  }
}