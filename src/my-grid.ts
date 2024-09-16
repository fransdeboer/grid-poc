import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Grid, GridColumn, GridFilterColumn, GridSelectionColumn, GridSortColumn } from '@sl-design-system/grid';
import type { DataSource } from '@sl-design-system/shared';
import { ArrayDataSource } from '@sl-design-system/shared';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { people, Person } from './data';
import { columns } from './columns';

@customElement('my-grid')
export class MyGrid extends ScopedElementsMixin(LitElement) {
  static get scopedElements(): ScopedElementsMap {
    return {
      'sl-button': Button,
      'sl-grid': Grid,
      'sl-grid-column': GridColumn,
      'sl-grid-filter-column': GridFilterColumn,
      'sl-grid-selection-column': GridSelectionColumn,
      'sl-grid-sort-column': GridSortColumn
    };
  }

  @query('sl-grid') grid!: Grid<Person>;

  @state() dataSource?: DataSource<Person>;

  @state() columns = columns;

  connectedCallback(): void {
    super.connectedCallback();
    this.dataSource = new ArrayDataSource(people as Person[]);
  }

  render(): TemplateResult {
    return html`
      <sl-button @click=${this.#reorder} variant="primary">Reorder</sl-button>

      <sl-grid .dataSource=${this.dataSource}>
      ${repeat(this.columns, col => col.id, col => {
        if (col.filter) {
          return html`<sl-grid-filter-column .id=${col.id} .path=${col.path} .mode=${col.filter.mode}></sl-grid-filter-column>`
        } else {
          return html`<sl-grid-column .path=${col.path}></sl-grid-column>`
        }
      })}
      </sl-grid>
  `
  }

  async #reorder(): Promise<void> {
    this.columns = this.columns.slice().reverse();

    this.dataSource?.update();

    await new Promise(resolve => setTimeout(resolve));
    await this.grid.recalculateColumnWidths();

    // this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-grid': MyGrid
  }
}

