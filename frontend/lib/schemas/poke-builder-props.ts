export interface PokeBowlBuilderProps {
  pokeOptions: {
    bases: string[];
    proteinas: string[];
    extraProteinas?: string[];
    toppings: string[];
    agregados: string[];
    salsas: string[];
    preselectedSize?: "regular" | "grande" | null;
  };
}