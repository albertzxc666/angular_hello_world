// Интерфейсы для типизации данных с бэка
interface MedExtensionItem {
  title: string;
  detail: string;
}

interface MedExtensionDetail {
  pretitle: string;
  items: MedExtensionItem[];
}

interface MedExtensionData {
  title: string;
  detail: MedExtensionDetail;
}

// Предполагаем, что эти типы уже существуют в вашем проекте
interface SbiTextListElement {
  label: string;
  iconColor: string;
  iconImage: string;
}

// Константа для иконки (предполагаем, что она уже определена)
const STATUS_SUCCES_FILL = 'status-success-fill';

export class ExtensionsDialogComponent {
  public firstList: Array<SbiTextListElement> = [];
  public secondList: Array<SbiTextListElement> = [];
  public dialogTitle: string = '';
  public dialogNote: string = '';
  public firstListDescription: string = '';
  public secondListDescription: string = '';

  getMedExtension(medExtension: MedExtensionData): void {
    // Устанавливаем основные данные
    this.dialogTitle = medExtension.title;
    this.dialogNote = medExtension.detail.pretitle;
    
    // Устанавливаем описания для каждого элемента
    this.firstListDescription = medExtension.detail.items[0]?.detail || '';
    this.secondListDescription = medExtension.detail.items[1]?.detail || '';
    
    // Создаем списки элементов
    this.firstList = medExtension.detail.items.map((item: MedExtensionItem) => ({
      label: item.title,
      iconColor: 'tertiary',
      iconImage: STATUS_SUCCES_FILL
    }));
    
    // Если нужны разные списки, можно создать отдельную логику
    // Пока что создаем копию первого списка
    this.secondList = [...this.firstList];
  }
}