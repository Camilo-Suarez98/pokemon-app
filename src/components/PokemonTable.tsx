import { useState } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import CustomSelect from '../components/ui/Select';
import type { PokemonProps, PokemonType } from "../types/pokemon";
import { lowAndHighStats } from "../utils/stats";

const toCapitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getStat = (pokemon: PokemonType, statName: string): number => {
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat?.base_stat ?? 0;
};

const PokemonTable: React.FC<PokemonProps> = ({ pokemons, onSelect }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const uniqueTypes = Array.from(new Set(
    pokemons.flatMap(pokemon => pokemon.types.map(type => type.type.name))
  ));

  const typeOptions = uniqueTypes.map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1)
  }));

  const filteredPokemons = selectedTypes.length > 0
    ? pokemons.filter(pokemon =>
      pokemon.types.some(type => selectedTypes.includes(type.type.name))
    )
    : pokemons;

  const columns: TableColumn<PokemonType>[] = [
    {
      name: "Image",
      selector: (row) => row.sprites.other.official_artwork.front_default,
      cell: (row) => (
        <img
          src={row.sprites.front_default}
          alt={row.name}
          width={80}
          height={80}
        />
      ),
      sortable: false,
      width: "100px",
    },
    {
      name: (
        <p>
          Name
        </p>
      ),
      selector: (row) => toCapitalize(row.name),
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Type
        </p>
      ),
      selector: (row) =>
        row.types.map((t) => toCapitalize(t.type.name)).join(", "),
      sortable: true,
      width: "150px",
      sortFunction: (a, b) => {
        const aTypes = a.types.map((t) => t.type.name);
        const bTypes = b.types.map((t) => t.type.name);

        if (aTypes[0] < bTypes[0]) return -1;
        if (aTypes[0] > bTypes[0]) return 1;

        const aSecond = aTypes[1] ?? "";
        const bSecond = bTypes[1] ?? "";

        if (aSecond < bSecond) return -1;
        if (aSecond > bSecond) return 1;

        return 0;
      },
    },
    {
      name: (
        <p>
          Weight (kg)
        </p>
      ),
      selector: (row) => row.weight / 10,
      sortable: true,
      format: (row) => row.weight / 10,
      width: "150px",
    },
    {
      name: (
        <p>
          Height (m)
        </p>
      ),
      selector: (row) => row.height / 10,
      sortable: true,
      format: (row) => row.height / 10,
      width: "150px",
    },
    {
      name: (
        <p>
          Health
        </p>
      ),
      selector: (row) => getStat(row, "hp"),
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Exp. Base
        </p>
      ),
      selector: (row) => row.base_experience,
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Attack
        </p>
      ),
      selector: (row) => getStat(row, "attack"),
      cell: (row) => {
        const attack = getStat(row, "attack");
        const color = lowAndHighStats(attack);
        return <span className={color}>{attack}</span>;
      },
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Defense
        </p>
      ),
      selector: (row) => getStat(row, "defense"),
      cell: (row) => {
        const defense = getStat(row, "defense");
        const color = lowAndHighStats(defense);
        return <span className={color}>{defense}</span>;
      },
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Special<br />Attack
        </p>
      ),
      selector: (row) => getStat(row, "special-attack"),
      cell: (row) => {
        const specialAttack = getStat(row, "special-attack");
        const color = lowAndHighStats(specialAttack);
        return <span className={color}>{specialAttack}</span>;
      },
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Special <br /> Defense
        </p>
      ),
      selector: (row) => getStat(row, "special-defense"),
      cell: (row) => {
        const specialDefense = getStat(row, "special-defense");
        const color = lowAndHighStats(specialDefense);
        return <span className={color}>{specialDefense}</span>;
      },
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Speed
        </p>
      ),
      selector: (row) => getStat(row, "speed"),
      cell: (row) => {
        const speed = getStat(row, "speed");
        const color = lowAndHighStats(speed);
        return <span className={color}>{speed}</span>;
      },
      sortable: true,
      width: "150px",
    },
    {
      name: (
        <p>
          Details
        </p>
      ),
      cell: (row) => (
        <button
          onClick={() => onSelect(row)}
          className="text-sm px-2 py-1 bg-blue-600 text-white rounded cursor-pointer outline-none hover:bg-blue-700"
        >
          Details
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      {
        pokemons.length > 0 && (
          <CustomSelect
            options={typeOptions}
            value={selectedTypes}
            onChange={setSelectedTypes}
          />
        )
      }
      <DataTable
        columns={columns}
        data={filteredPokemons}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50]}
        customStyles={{
          rows: {
            style: {
              fontSize: '15px',
              fontWeight: '500',
            },
          },
          headCells: {
            style: {
              fontSize: '15px',
              fontWeight: '600',
            },
          },
          cells: {
            style: {
              fontSize: '15px',
              fontWeight: '600',
            },
          },
        }}
        responsive
        striped
        highlightOnHover
        dense
        noDataComponent="Loading Pokémons..."
      />
    </div>
  );
};

export default PokemonTable;
