// priority: 999
global.debug = false;

ServerEvents.recipes((event) => {
  const dontReplaceMe = {
    not: [
      { id: /botania:.*_quartz/ },
      { id: /botania:.*_quartz_slab/ },
      { id: /botania:.*_quartz_pillar/ },
      { id: /botania:.*_quartz_stairs/ },
      { id: "minecraft:quartz_pillar" },
      { id: "minecraft:cut_copper_from_copper_block_stonecutting" },
      { id: "minecraft:cut_copper_stairs_from_cut_copper_stonecutting" },
      { id: "minecraft:cut_copper_slab_from_cut_copper_stonecutting" },
      { id: "minecraft:cut_copper" },
      { id: "minecraft:cut_copper_stairs" },
      { id: "minecraft:cut_copper_slab" },
      { id: "minecraft:copper_ingot" },
      { id: "minecraft:cut_copper_stairs_from_copper_block_stonecutting" },
      { id: "minecraft:cut_copper_slab_from_copper_block_stonecutting" },
      { id: "minecraft:waxed_copper_block_from_honeycomb" },
      { id: "minecraft:waxed_cut_copper_from_honeycomb" },
      { id: /.*yellow*./ },
    ],
  };

  let replaceIO = (tag, item) => {
    event.replaceInput(dontReplaceMe, tag, tag);
    event.replaceOutput(dontReplaceMe, tag, item);
  };

  function unifyMetal(
    name,
    ore,
    deepslateOre,
    rawOre,
    rawOreBlock,
    block,
    ingot,
    nugget,
    gem,
    dust,
    fluid,
    gear,
    plate,
    rod,
    crushed,
    dirtyDust,
    wire
  ) {
    let obj = {
      name: name,
      ore: ore,
      deepslateOre: deepslateOre,
      rawOre: rawOre,
      rawOreBlock: rawOreBlock,
      block: block,
      ingot: ingot,
      nugget: nugget,
      gem: gem,
      dust: dust,
      fluid: fluid,
      gear: gear,
      plate: plate,
      rod: rod,
      crushed: crushed,
      dirtyDust: dirtyDust,
      wire: wire,
    };

    if (rawOre) {
      replaceIO(`#forge:raw_materials/${name}`, rawOre);
    }
    if (rawOreBlock) {
      replaceIO(`#forge:storage_blocks/raw_${name}`, rawOreBlock);
    }
    if (block) {
      replaceIO(`#forge:storage_blocks/${name}`, block);
    }
    if (ingot) {
      replaceIO(`#forge:ingots/${name}`, ingot);
    }
    if (nugget) {
      replaceIO(`#forge:nuggets/${name}`, nugget);
    }
    if (gem) {
      replaceIO(`#forge:gems/${name}`, gem);
    }
    if (dust) {
      replaceIO(`#forge:dusts/${name}`, dust);
    }
    if (gear) {
      replaceIO(`#forge:gears/${name}`, gear);
    }
    if (plate) {
      replaceIO(`#forge:plates/${name}`, plate);
    }
    if (rod) {
      replaceIO(`#forge:rods/${name}`, rod);
    }
    if (wire) {
      replaceIO(`#forge:wires/${name}`, wire);
    }

    unifyMinecraft(obj, event);
    unifyTinkers(obj, event);
    unifyThermal(obj, event);
    unifyMekanism(obj, event);
    unifyIE(obj, event);
    unifyCA(obj, event);
    unifyCreate(obj, event);
  }

  replaceIO("#forge:silicon", "ae2:silicon");
  replaceIO("#forge:dusts/ender_pearl", "ae2:ender_dust");
  replaceIO("#forge:dusts/wood", "thermal:sawdust");

  //Charcoal Block
  replaceIO("#forge:storage_blocks/charcoal", "mekanism:block_charcoal");

  //Charcoal Dust
  event.recipes.immersiveengineeringCrusher("mekanism:dust_charcoal", "#forge:charcoal");
  event.recipes.immersiveengineeringCrusher("9x mekanism:dust_charcoal", "#forge:storage_blocks/charcoal");
  event.recipes.createCrushing(["mekanism:dust_charcoal"], "#forge:charcoal");
  event.recipes.thermal.pulverizer("mekanism:dust_charcoal", "#forge:charcoal");

  //Coal Dust
  replaceIO("#forge:dusts/coal", "mekanism:dust_coal");
  event.recipes.createCrushing(["mekanism:dust_coal"], "minecraft:coal");
  event.recipes.thermal.pulverizer("mekanism:dust_coal", "minecraft:coal");

  //Sulfur Dust
  replaceIO("#forge:dusts/sulfur", "mekanism:dust_sulfur");
  event.recipes.immersiveengineeringCrusher("mekanism:dust_sulfur", "#forge:gems/sulfur");
  event.recipes.createCrushing(["mekanism:dust_sulfur"], "#forge:gems/sulfur");
  event.recipes.mekanismEnriching("mekanism:dust_sulfur", "#forge:gems/sulfur");

  //Obsidian Dust
  replaceIO("#forge:dusts/obsidian", "mekanism:dust_obsidian");
  event.recipes.immersiveengineeringCrusher("4x mekanism:dust_obsidian", "minecraft:obsidian");
  event.recipes.thermal.pulverizer("4x mekanism:dust_obsidian", "minecraft:obsidian");

  //Fluorite
  event.recipes.thermal.pulverizer("6x mekanism:fluorite_gem", "#forge:ores/fluorite");

  //Fluorite Dust
  event.recipes.createCrushing(["mekanism:dust_fluorite"], "#forge:gems/fluorite");
  event.recipes.immersiveengineeringCrusher("mekanism:dust_fluorite", "#forge:gems/fluorite");
  event.recipes.thermal.pulverizer("mekanism:dust_fluorite", "#forge:gems/fluorite");

  unifyMetal(
    "aluminum",
    "immersiveengineering:ore_aluminum",
    "immersiveengineering:deepslate_ore_aluminum",
    "immersiveengineering:raw_aluminum",
    "immersiveengineering:raw_block_aluminum",
    "immersiveengineering:storage_aluminum",
    "immersiveengineering:ingot_aluminum",
    "immersiveengineering:nugget_aluminum",
    "",
    "immersiveengineering:dust_aluminum",
    "",
    "",
    "immersiveengineering:plate_aluminum",
    "immersiveengineering:stick_aluminum",
    "create:crushed_raw_aluminum",
    "",
    "immersiveengineering:wire_aluminum"
  );

  unifyMetal(
    "brass",
    "",
    "",
    "",
    "",
    "create:brass_block",
    "create:brass_ingot",
    "create:brass_nugget",
    "",
    "",
    "tconstruct:molten_brass",
    "",
    "create:brass_sheet",
    "createaddition:brass_rod",
    "",
    "",
    ""
  );

  unifyMetal(
    "bronze",
    "",
    "",
    "",
    "",
    "ic2:bronze_block",
    "ic2:ingot_bronze",
    "",
    "",
    "ic2:dust_bronze",
    "",
    "",
    "vintageimprovements:bronze_sheet",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "constantan",
    "",
    "",
    "",
    "",
    "immersiveengineering:storage_constantan",
    "immersiveengineering:ingot_constantan",
    "immersiveengineering:nugget_constantan",
    "",
    "immersiveengineering:dust_constantan",
    "",
    "",
    "immersiveengineering:plate_constantan",
    "",
    "",
    "",
    "vintageimprovements:constantan_wire"
  );

  unifyMetal(
    "copper",
    "minecraft:copper_ore",
    "minecraft:deepslate_copper_ore",
    "minecraft:raw_copper",
    "minecraft:raw_copper_block",
    "minecraft:copper_block",
    "minecraft:copper_ingot",
    "create:copper_nugget",
    "",
    "ic2:dust_copper",
    "",
    "",
    "create:copper_sheet",
    "createaddition:copper_rod",
    "create:crushed_raw_copper",
    "mekanism:dirty_dust_copper",
    "createaddition:copper_wire"
  );

  unifyMetal(
    "diamond",
    "minecraft:diamond_ore",
    "minecraft:deepslate_diamond_ore",
    "",
    "",
    "minecraft:diamond_block",
    "",
    "",
    "minecraft:diamond",
    "ic2:dust_diamond",
    "tconstruct:molten_diamond",
    "",
    "",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "electrum",
    "",
    "",
    "",
    "",
    "immersiveengineering:storage_electrum",
    "immersiveengineering:ingot_electrum",
    "immersiveengineering:nugget_electrum",
    "",
    "immersiveengineering:dust_electrum",
    "",
    "",
    "createaddition:electrum_sheet",
    "",
    "",
    "",
    "immersiveengineering:wire_electrum"
  );

  unifyMetal(
    "emerald",
    "minecraft:emerald_ore",
    "minecraft:deepslate_emerald_ore",
    "",
    "",
    "minecraft:emerald_block",
    "",
    "",
    "minecraft:emerald",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );

//   unifyMetal(
//     "enderium",
//     "",
//     "",
//     "",
//     "",
//     "thermal:enderium_block",
//     "thermal:enderium_ingot",
//     "thermal:enderium_nugget",
//     "",
//     "thermal:enderium_dust",
//     "tconstruct:molten_enderium",
//     "thermal:enderium_gear",
//     "thermal:enderium_plate",
//     "",
//     "",
//     "",
//     ""
//   );

//   unifyMetal(
//     "signalum",
//     "",
//     "",
//     "",
//     "",
//     "thermal:signalum_block",
//     "thermal:signalum_ingot",
//     "thermal:signalum_nugget",
//     "",
//     "thermal:signalum_dust",
//     "tconstruct:molten_signalum",
//     "thermal:signalum_gear",
//     "thermal:signalum_plate",
//     "",
//     "",
//     "",
//     ""
//   );

  unifyMetal(
    "gold",
    "minecraft:gold_ore",
    "minecraft:deepslate_gold_ore",
    "minecraft:raw_gold",
    "minecraft:raw_gold_block",
    "minecraft:gold_block",
    "minecraft:gold_ingot",
    "minecraft:gold_nugget",
    "",
    "ic2:dust_gold",
    "",
    "",
    "create:golden_sheet",
    "createaddition:gold_rod",
    "create:crushed_raw_gold",
    "",
    "createaddition:gold_wire"
  );

//   unifyMetal(
//     "invar",
//     "",
//     "",
//     "",
//     "",
//     "thermal:invar_block",
//     "thermal:invar_ingot",
//     "thermal:invar_nugget",
//     "",
//     "thermal:invar_dust",
//     "tconstruct:molten_invar",
//     "thermal:invar_gear",
//     "thermal:invar_plate",
//     "",
//     "",
//     "",
//     ""
//   );

  unifyMetal(
    "iron",
    "minecraft:iron_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:raw_iron",
    "minecraft:raw_iron_block",
    "minecraft:iron_block",
    "minecraft:iron_ingot",
    "minecraft:iron_nugget",
    "",
    "mekanism:dust_iron",
    "",
    "",
    "create:iron_sheet",
    "createaddition:iron_rod",
    "create:crushed_raw_iron",
    "",
    "createaddition:iron_wire"
  );

  unifyMetal(
    "lapis",
    "",
    "",
    "",
    "",
    "minecraft:lapis_block",
    "",
    "",
    "minecraft:lapis_lazuli",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "lead",
    "createindustry:lead_ore",
    "createindustry:deepslate_lead_ore",
    "createindustry:raw_lead",
    "immersiveengineering:raw_lead_block",
    "immersiveengineering:storage_lead",
    "createindustry:lead_ingot",
    "immersiveengineering:lead_nugget",
    "",
    "thermal:lead_dust",
    "tconstruct:molten_lead",
    "thermal:lead_gear",
    "thermal:lead_plate",
    "",
    "create:crushed_raw_lead",
    "mekanism:dirty_dust_lead",
    "immersiveengineering:wire_lead"
  );

  unifyMetal(
    "lumium",
    "",
    "",
    "",
    "",
    "thermal:lumium_block",
    "thermal:lumium_ingot",
    "thermal:lumium_nugget",
    "",
    "thermal:lumium_dust",
    "tconstruct:molten_lumium",
    "thermal:lumium_gear",
    "thermal:lumium_plate",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "manyullyn",
    "",
    "",
    "",
    "",
    "tconstruct:manyullyn_block",
    "tconstruct:manyullyn_ingot",
    "tconstruct:manyullyn_nugget",
    "",
    "",
    "tconstruct:molten_manyullyn",
    "",
    "",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "netherite",
    "",
    "",
    "",
    "",
    "minecraft:netherite_block",
    "minecraft:netherite_ingot",
    "thermal:netherite_nugget",
    "",
    "thermal:netherite_dust",
    "tconstruct:molten_netherite",
    "thermal:netherite_gear",
    "thermal:netherite_plate",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "nickel",
    "thermal:nickel_ore",
    "thermal:deepslate_nickel_ore",
    "thermal:raw_nickel",
    "thermal:raw_nickel_block",
    "thermal:nickel_block",
    "thermal:nickel_ingot",
    "thermal:nickel_nugget",
    "",
    "thermal:nickel_dust",
    "tconstruct:molten_nickel",
    "thermal:nickel_gear",
    "thermal:nickel_plate",
    "",
    "create:crushed_raw_nickel",
    "",
    ""
  );

  unifyMetal(
    "osmium",
    "mekanism:osmium_ore",
    "mekanism:deepslate_osmium_ore",
    "mekanism:raw_osmium",
    "mekanism:block_raw_osmium",
    "mekanism:block_osmium",
    "mekanism:ingot_osmium",
    "mekanism:nugget_osmium",
    "",
    "mekanism:dust_osmium",
    "tconstruct:molten_osmium",
    "",
    "",
    "",
    "create:crushed_raw_osmium",
    "mekanism:dirty_dust_osmium",
    ""
  );

  unifyMetal(
    "pig_iron",
    "",
    "",
    "",
    "",
    "tconstruct:pig_iron_block",
    "tconstruct:pig_iron_ingot",
    "tconstruct:pig_iron_nugget",
    "",
    "",
    "tconstruct:molten_pig_iron",
    "",
    "",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "quartz",
    "",
    "",
    "",
    "",
    "minecraft:quartz_block",
    "",
    "",
    "minecraft:quartz",
    "thermal:quartz_dust",
    "tconstruct:molten_quartz",
    "thermal:quartz_gear",
    "",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "rose_gold",
    "",
    "",
    "",
    "",
    "tconstruct:rose_gold_block",
    "tconstruct:rose_gold_ingot",
    "tconstruct:rose_gold_nugget",
    "",
    "thermal:rose_gold_dust",
    "tconstruct:molten_rose_gold",
    "thermal:rose_gold_gear",
    "thermal:rose_gold_plate",
    "",
    "",
    "",
    ""
  );

  unifyMetal(
    "silver",
    "thermal:silver_ore",
    "thermal:deepslate_silver_ore",
    "thermal:raw_silver",
    "thermal:raw_silver_block",
    "thermal:silver_block",
    "thermal:silver_ingot",
    "thermal:silver_nugget",
    "",
    "thermal:silver_dust",
    "tconstruct:molten_silver",
    "thermal:silver_gear",
    "thermal:silver_plate",
    "",
    "create:crushed_raw_silver",
    "",
    ""
  );

  unifyMetal(
    "steel",
    "",
    "",
    "",
    "",
    "immersiveengineering:storage_steel",
    "immersiveengineering:ingot_steel",
    "immersiveengineering:nugget_steel",
    "",
    "immersiveengineering:dust_steel",
    "tconstruct:molten_steel",
    "thermal:steel_gear",
    "immersiveengineering:plate_steel",
    "immersiveengineering:stick_steel",
    "",
    "",
    ""
  );

  unifyMetal(
    "tin",
    "thermal:tin_ore",
    "thermal:deepslate_tin_ore",
    "thermal:raw_tin",
    "thermal:raw_tin_block",
    "thermal:tin_block",
    "thermal:tin_ingot",
    "thermal:tin_nugget",
    "",
    "thermal:tin_dust",
    "tconstruct:molten_tin",
    "thermal:tin_gear",
    "thermal:tin_plate",
    "",
    "create:crushed_raw_tin",
    "mekanism:dirty_dust_tin",
    ""
  );

  unifyMetal(
    "uranium",
    "mekanism:uranium_ore",
    "immersiveengineering:deepslate_ore_uranium",
    "mekanism:raw_uranium",
    "mekanism:block_raw_uranium",
    "mekanism:block_uranium",
    "mekanism:ingot_uranium",
    "mekanism:nugget_uranium",
    "",
    "mekanism:dust_uranium",
    "tconstruct:molten_uranium",
    "",
    "immersiveengineering:plate_uranium",
    "",
    "create:crushed_raw_uranium",
    "mekanism:dirty_dust_uranium",
    ""
  );

  unifyMetal(
    "zinc",
    "create:zinc_ore",
    "create:deepslate_zinc_ore",
    "create:raw_zinc",
    "create:raw_zinc_block",
    "create:zinc_block",
    "create:zinc_ingot",
    "create:zinc_nugget",
    "",
    "",
    "tconstruct:molten_zinc",
    "",
    "createaddition:zinc_sheet",
    "",
    "create:crushed_raw_zinc",
    "",
    ""
  );
});
