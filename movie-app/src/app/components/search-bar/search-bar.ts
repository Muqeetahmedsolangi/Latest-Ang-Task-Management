import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() searched = new EventEmitter<string>();

  searchTerm = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(500), // ← 500ms baad API call
        distinctUntilChanged(), // ← Same value dobara nahi
        takeUntil(this.destroy$), // ← Memory leak nahi hoga
      )
      .subscribe((term) => {
        this.searched.emit(term);
      });
  }

  onInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
