import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnInit {
  stockData: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'Symbol',
    'Sector',
    'RSI',
    'Today %',
    'Yesterday %',
    'Day Before Yesterday %',
  ];
  dynamicDateColumns: string[] = [];
  filterText: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStockData();
  }

  fetchStockData(): void {
    this.http.get<any[]>('http://localhost:5000/StockData').subscribe((data) => {
      this.stockData = data;
      this.dynamicDateColumns = this.getDynamicDateColumns();
      this.displayedColumns = [...this.displayedColumns, ...this.dynamicDateColumns];
      this.dataSource.data = this.stockData;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      console.log('Dynamic Date Columns:', this.dynamicDateColumns);
    });
  }

  getDynamicDateColumns(): string[] {
    if (this.stockData.length > 0) {
      const dateColumns = Object.keys(this.stockData[0]).filter(
        (key) => key.includes('AM') || key.includes('PM')
      );

      // Sort dates in chronological order
      dateColumns.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      return dateColumns;
    }
    return [];
  }

  getFirstDynamicDateColumn(): string {
    return this.dynamicDateColumns.length > 0 ? this.dynamicDateColumns[0] : '';
  }

  getPriceColor(item: any, date: string, index: number): string {
    if (index === 0) {
      return ''; // No comparison for the first date column
    }

    // Parse current and previous prices as numbers
    const currentPrice = parseFloat(item[date]);
    const previousDate = this.dynamicDateColumns[index - 1];
    const previousPrice = parseFloat(item[previousDate]);

    console.log(`Current Date: ${date}, Current Price: ${currentPrice}`);
    console.log(`Previous Date: ${previousDate}, Previous Price: ${previousPrice}`);

    if (isNaN(currentPrice) || isNaN(previousPrice)) {
      return ''; // Handle invalid numbers
    }

    if (currentPrice < previousPrice) {
      return 'lightgreen'; // Price decreased (now light green)
    } else if (currentPrice > previousPrice) {
      return 'lightcoral'; // Price increased (now light red)
    } else {
      return ''; // No change
    }
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterText.trim().toLowerCase();
  }

  refreshData(): void {
    this.fetchStockData();
    console.log('Data refreshed');
  }

  exportData(): void {
    console.log('Exporting data...');
    // Add your export logic here
  }

  logout(): void {
    console.log('Logging out...');
    // Add your logout logic here
  }
}